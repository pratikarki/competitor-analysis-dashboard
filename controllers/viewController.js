const Domain = require('../models/domainModel');
const catchAsync = require('../utils/catchAsync');

exports.getHomePage = (req, res) => {
  res.status(200).render('home', {
    title: 'Home',
    user: 'Pratik Karki'
  });
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
    user: 'Pratik Karki'
  });
}

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    title: 'Register',
    user: 'Pratik Karki'
  });
}

exports.getOverviewPage = catchAsync(async (req, res, next) => {
  // 1. Get domain data from collection
  const domain = await Domain.findById(req.params.id);
  console.log(domain);
  // 2. Build template

  // 3. Render template using the domain data
  res.status(200).render('overview', {
    title: 'Overview',
    domain: domain,
    user: 'Pratik Karki'
  });
})
