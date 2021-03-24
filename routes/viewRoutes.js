const express = require('express');
const { getHomePage, getLoginPage, getRegisterPage, getLoadingPage, getOverviewPage, getProfilePage, getMetricsPage, getFeedbackPage, getKeywordsPage, getPasswordForgotPage, getPasswordResetPage, getAdminOverviewPage, getAdminProfilePage, getAdminFeedbackPage } = require('../controllers/viewController');
const { isLoggedIn, protect } = require('../controllers/authController');

const router = express.Router();

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/forgotPassword', getPasswordForgotPage);
router.get('/resetPassword/:token', getPasswordResetPage);

router.get('/loading', getLoadingPage);
router.get('/profile', protect, getProfilePage);

// router.use();
router.get('/overview', isLoggedIn, getOverviewPage);
router.get('/metrics', isLoggedIn, getMetricsPage);
router.get('/keywords', isLoggedIn, getKeywordsPage);
router.get('/feedback', isLoggedIn, getFeedbackPage);


router.get('/adminOverview', protect, getAdminOverviewPage);
router.get('/adminFeedback', isLoggedIn, getAdminFeedbackPage);
router.get('/adminProfile', isLoggedIn, getAdminProfilePage);



module.exports = router;