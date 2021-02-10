const Domain = require('../models/domainModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllDomains = async (req, res) => {
  try {
    // console.log(req.requestTime);
    const allDomains = await Domain.find();

    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      results: allDomains.length,
      data: { allDomains }
    })
  }
  catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }

}

exports.createNewDomain = catchAsync(async (req, res, next) => {
  // const newDomain = new Domain({})
  // newDomain.save();
  const newDomain = await Domain.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { domain: newDomain }
  })
})

exports.getDomain = catchAsync(async (req, res, next) => {
  // console.log(req.params);
  const domain = await Domain.findById(req.params.id)
  //Domain.findOne({ _id: req.params.id })

  if (!domain) {
    const err = new AppError('No domain found with that ID', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: { domain }
  })
})

exports.updateDomain = catchAsync(async (req, res, next) => {
  const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!updatedDomain) {
    const err = new AppError('No domain found with that ID', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: { updatedDomain }
  })
})

exports.deleteDomain = catchAsync(async (req, res, next) => {
  const deletedDomain = await Domain.findByIdAndDelete(req.params.id);

  if (!deletedDomain) {
    const err = new AppError('No domain found with that ID', 404);
    return next(err);
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})

