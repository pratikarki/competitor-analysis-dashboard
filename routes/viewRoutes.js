const express = require('express');
const { getHomePage, getLoginPage, getRegisterPage, getOverviewPage, getProfilePage, getMetricsPage } = require('../controllers/viewController');
const { isLoggedIn, protect } = require('../controllers/authController');

const router = express.Router();

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);

router.get('/profile', protect, getProfilePage);

// router.use();
router.get('/overview', isLoggedIn, getOverviewPage);
router.get('/metrics', isLoggedIn, getMetricsPage);


module.exports = router;