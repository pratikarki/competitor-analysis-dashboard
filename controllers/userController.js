const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const factory = require('./factoryHandler');
const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

const bufferStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  }
  else {
    const err = new AppError('Not an image, Please upload an image file', 400);
    cb(err, false);
  }
}

const buffer = multer({
  storage: bufferStorage,
  fileFilter: multerFilter
});

exports.bufferPhoto = buffer.single('photo');

exports.resizePhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`)
  
  // console.log(req.file);
  next();
}

exports.getAllUsers = factory.getAll(User, { path: 'domain_id competitorSites feedbacks', select: 'name' });

exports.createNewUser = factory.createOne(User);

exports.getUser = factory.getOne(User, { path: 'domain_id competitorSites feedbacks' }); //, select: 'name rating category message createdAt'

exports.updateUser = factory.updateOne(User); //{ path: 'domain_id competitorSites', select: '-__v' }

exports.deleteUser = factory.deleteOne(User);
//deleteOne returns a function that will delete a document from User model


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