const Domain = require('../models/domainModel');
const factory = require('./factoryHandler');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

exports.getAllDomains = factory.getAll(Domain);

exports.createNewDomain = factory.createOne(Domain);

exports.getDomain = factory.getOne(Domain);

exports.updateDomain = factory.updateOne(Domain);

exports.deleteDomain = factory.deleteOne(Domain);
//deleteOne returns a function that will delete a document from Tour model
