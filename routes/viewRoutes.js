const express = require('express');
const { getHomePage, getLoginPage, getRegisterPage, getLoadingPage, getOverviewPage, getProfilePage, getMetricsPage, getFeedbackPage, getKeywordsPage, getPasswordForgotPage, getPasswordResetPage, getAdminOverviewPage, getAdminProfilePage, getAdminFeedbackPage, getAdminAddPage } = require('../controllers/viewController');
const { isLoggedIn, protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/forgotPassword', getPasswordForgotPage);
router.get('/resetPassword/:token', getPasswordResetPage);
router.get('/loading', getLoadingPage);

router.get('/profile', protect, getProfilePage);

// router.use();
router.get('/overview', protect, restrictTo('user'), getOverviewPage);
router.get('/metrics', protect, restrictTo('user'), getMetricsPage);
router.get('/keywords', protect, restrictTo('user'), getKeywordsPage);
router.get('/feedback', protect, restrictTo('user'), getFeedbackPage);

router.get('/adminOverview', protect, restrictTo('admin'), getAdminOverviewPage);
router.get('/adminFeedback', protect, restrictTo('admin'), getAdminFeedbackPage);
router.get('/adminAdd', protect, restrictTo('admin'), getAdminAddPage);
router.get('/adminProfile', protect, restrictTo('admin'), getAdminProfilePage);



module.exports = router;