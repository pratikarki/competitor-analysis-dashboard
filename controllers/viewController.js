const Domain = require('../models/domainModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getHomePage = (req, res) => {
  res.status(200).render('home', {
    title: 'Home'
  });
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    title: 'Login'
  });
}

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    title: 'Register'
  });
}

exports.getOverviewPage = catchAsync(async (req, res, next) => {
  // 1. Get all data from collection
  if (!req.user) {
    const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
    return next(err);
  }
  const user = req.user;
  // 2. Build template

  // 3. Render template using the domain data
  res.status(200).render('overview', {
    title: 'Overview',
    user: user,
    domain: user.domain_id,
    competitors: user.competitorSites
  });
})

exports.getProfilePage = (req, res) => {
  const user = req.user;
  res.status(200).render('profile', {
    title: `Profile | ${user.fullName.split(' ')[0]}`,
    user: user,
    domain: user.domain_id,
  })
}