const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const catchAsync = require('../utils/catchAsync');

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN
})

const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), //converting days to milliseconds
    httpOnly: true
  }
  //if (req.secure || req.headers('x-forwarded-proto') === 'https') cookieOptions.secure = true; //use secure https only in production
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined; //removing password from output

  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user: user
    }
  })
}

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  })
  return newObj;
}

exports.signup = catchAsync(async (req, res, next) => {
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
    country: req.body.country,
    domain_id: req.body.domain_id
  })

  const url = `${req.protocol}://${req.get('host')}/profile`;
  await new Email(newUser, url).sendWelcome();

  createAndSendToken(newUser, 201, req, res);
})

exports.signupOnly = catchAsync(async (req, res, next) => {
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
    country: req.body.country,
    domain_id: req.body.domain_id
  })

  const url = `${req.protocol}://${req.get('host')}/profile`;
  await new Email(newUser, url).sendWelcome();

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser
    }
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. Check if email password exist
  if (!email || !password) {
    const err = new AppError('Please provide email and password', 400);
    return next(err);
  }
  
  //2. Check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password))) { //checkPassword returns true or false
    const err = new AppError('Incorrect email or password', 401);
    return next(err);
  }

  //3. Send token back to client
  createAndSendToken(user, 200, req, res);
})

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({ status: 'success' });
}

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1. Check if token exist
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    const err = new AppError('You are not logged in. Please log in to get access.', 401);
    return next(err);
  }

  //2. Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. Check if user still exist
  const currentUser = await User.findById(decoded.id).populate({ path: 'domain_id' });
  if(!currentUser) {
    const err = new AppError('Sorry, the user with this token no longer exist :(', 401);
    return next(err);
  }

  //4. Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) { //if so, return error
    const err = new AppError('Password has just been changed! Please log in again.', 401);
    return next(err);
  }

  //Finally, grant access to the protected route
  req.user = currentUser;
  next();
})

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      //1. Verify token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

      //3. Check if user still exist
      const currentUser = await User.findById(decoded.id).populate({ path: 'domain_id competitorSites' });
      if(!currentUser) {
        return next();
      }

      //4. Check if user changed password after token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      req.user = currentUser;
      // res.locals.user = currentUser;
      return next();
    }
    catch (err) {
      return next();
    }
  }
  next();
}

exports.restrictTo = (...roles) => (req, res, next) => {
  //roles is an array ['admin', 'user']
  if (!roles.includes(req.user.role)) {
    const err = new AppError('You do not have permission to perform this action', 403);
    return next(err);
  }
  next();
}

exports.forgotPassword = catchAsync(async (req, res, next)  => {
  //1. Get user based on provided email
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    const err = new AppError('There is no user with that email address', 404);
    return next(err);
  }

  //2. Generate random reset token
  const resetToken = user.createPasswordResetToken();
  user.save({ validateBeforeSave: false });

  //3. Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email.'
    })    
  }
  catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });

    const error = new AppError('There was an error sending the email. Try again later.', 500);
    return next(error);
  }
})

exports.resetPassword = catchAsync(async (req, res, next)  => {
  //1. Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

  //2. If token has not expired and that user exist, set the password
  if (!user) {
    const err = new AppError('Token is invalid or has expired', 400);
    return next(err);
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3. Update changedPasswordAt property using 'pre save' middleware in userModel.js

  //4. Log the user in i.e. send JWT
  createAndSendToken(user, 200, req, res);
})

exports.getInfo = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}

exports.updateInfo = catchAsync(async (req, res, next) => {
  let user = {};

  if (req.body.fullName || req.body.userName) {
    //1. Filter only the fields to be updated ie 'fullName' and 'userName'
    const filteredBody = filterObj(req.body, 'fullName', 'userName');
    if (req.file) filteredBody.photo = req.file.filename;
    
    //2. Update user document
    user = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });
  }

  if (req.body.currentPassword && req.body.newPassword && req.body.confirmPassword) {
    //1. Get user from collection with password
    user = await User.findById(req.user.id).select('+password');

    //2. Check if posted password is correct
    if (!(await user.checkPassword(req.body.currentPassword, user.password))) {
      const err = new AppError('Your current password do not match.', 401);
      return next(err);
    }

    //3. If so, update user password
    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmPassword;
    await user.save(); 
    //User.findByIDAndUpdate will not work for updating password because we need 'pre save' middleware to run   
  }

  //4. Log user in i.e. send JWT
  createAndSendToken(user, 200, req, res);
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { accountActive: false })

  res.status(204).json({
    status: 'success',
    data: null
  })
})

exports.toggleUserStatus = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  //console.log(user);
  const status = user.accountActive; //true or false
  await User.findByIdAndUpdate(req.params.id, { accountActive: !status });

  res.status(204).json({
    status: 'success',
    data: null
  })
})
