const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.getAllUsers = catchAsync(async (req, res) => {

  const allUsers = await User.find();

  res.status(200).json({
    status: 'success',
    results: allUsers.length, 
    data: { allUsers }
  })
})

exports.createNewUser = catchAsync(async (req, res, next) => {
  // const newUser = new User({})
  // newUser.save();
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  })
})

exports.getUser = catchAsync(async (req, res, next) => {
  // console.log(req.params);
  const user = await User.findById(req.params.id)
  //User.findOne({ _id: req.params.id })

  if (!user) {
    const err = new AppError('No user found with that ID', 404);
    return next(err);
  }
  
  res.status(200).json({
    status: 'success',
    data: { user }
  })
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!updatedUser) {
    const err = new AppError('No user found with that ID', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: { updatedUser }
  })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    const err = new AppError('No user found with that ID', 404);
    return next(err);
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})


//APPENDIX
// exports.createNewUser = catchAsync((req, res, next) => {
//   User.init().then(async function() {
//     // const newUser = new User({})
//     // newUser.save();
//     const newUser = await User.create(req.body);

//     res.status(201).json({
//       status: 'success',
//       data: { user: newUser }
//     })
//   })
// })