const Domain = require('../models/domainModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryHandler');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const { getDomainData }  = require('./searchController');

exports.getAllDomains = factory.getAll(Domain);

exports.createNewDomain = factory.createOne(Domain);

exports.getDomain = factory.getOne(Domain);

exports.updateDomain = factory.updateOne(Domain);

exports.deleteDomain = factory.deleteOne(Domain);

exports.findDomain = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  //1. Check if name exist
  if (!name) {
    const err = new AppError('Please provide name of the domain.', 400);
    return next(err);
  }

  const domain = await Domain.findOne({ name });

  if (!domain) {
    res.status(404).json({
      status: 'fail',
    })  
  }
  else {
    res.status(200).json({
      status: 'success',
      data: domain
    })  
  }
})

exports.searchDomain = catchAsync(async (req, res, next) => {
  const { domain } = req.body;

  const result = await getDomainData(domain);

  res.status(200).json({
    status: 'success',
    data: result
  })  
})

