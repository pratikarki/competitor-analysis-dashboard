const Feedback = require('../models/feedbackModel');
const factory = require('./factoryHandler');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

exports.setUserId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.from) req.body.from = req.user.id;  
  next();
}

exports.getAllFeedbacks = factory.getAll(Feedback);

exports.createNewFeedback = factory.createOne(Feedback);

exports.getFeedback = factory.getOne(Feedback);

exports.deleteFeedback = factory.deleteOne(Feedback);
//deleteOne returns a function that will delete a document from Feedback model
