const User = require('../models/userModel');
const factory = require('./factoryHandler');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

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