const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = (Model, populateOptions) => catchAsync(async (req, res) => {
  let query = Model.find();
  if (populateOptions) query = query.populate(populateOptions);
  const document = await query;

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: document.length,
    data: { data: document }
  })
})

exports.createOne = Model => catchAsync(async (req, res, next) => {
  const document = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { data: document }
  })
})

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);
  if (populateOptions) query = query.populate(populateOptions);
  const document = await query;

  if (!document) {
    const err = new AppError('No document found with that ID', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: { data: document }
  })    
})

exports.updateOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (populateOptions) query = query.populate(populateOptions);
  const document = await query;

  if (!document) {
    const err = new AppError('No document found with that ID', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: { data: document }
  })
})

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const document = await Model.findByIdAndDelete(req.params.id);

  if (!document) {
    const err = new AppError('No document found with that ID', 404);
    return next(err);
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})

