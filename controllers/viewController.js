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
  if (!req.user) {
    const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
    return next(err);
  }
  const user = req.user;
  res.status(200).render('overview', {
    title: 'Overview',
    user: user,
    domain: user.domain_id,
    competitors: user.competitorSites
  });
})

exports.getMetricsPage = catchAsync(async (req, res, next) => {
  if (!req.user) {
    const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
    return next(err);
  }
  const user = req.user;
  res.status(200).render('compare_metrics', {
    title: 'Metrics Comparison',
    user: user,
    domain: user.domain_id,
    competitors: user.competitorSites
  });
})

exports.getKeywordsPage = catchAsync(async (req, res, next) => {
  if (!req.user) {
    const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
    return next(err);
  }
  const user = req.user;
  res.status(200).render('compare_keywords', {
    title: 'Keywords Comparison',
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

exports.getFeedbackPage = (req, res) => {
  const user = req.user;
  res.status(200).render('feedback', {
    title: `Feedback`,
    user: user
  })
}