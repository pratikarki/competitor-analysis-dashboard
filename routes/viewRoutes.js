const express = require('express');
const { getHomePage, getLoginPage, getRegisterPage, getOverviewPage, getProfilePage, getMetricsPage, getFeedbackPage, getKeywordsPage, getPasswordForgotPage, getPasswordResetPage } = require('../controllers/viewController');
const { isLoggedIn, protect } = require('../controllers/authController');

const router = express.Router();

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/forgotPassword', getPasswordForgotPage);
router.get('/resetPassword/:token', getPasswordResetPage);

router.get('/profile', protect, getProfilePage);

// router.use();
router.get('/overview', isLoggedIn, getOverviewPage);
router.get('/metrics', isLoggedIn, getMetricsPage);
router.get('/keywords', isLoggedIn, getKeywordsPage);
router.get('/feedback', isLoggedIn, getFeedbackPage);


module.exports = router;