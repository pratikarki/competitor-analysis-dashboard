const express = require('express');
const { getHomePage, getLoginPage, getRegisterPage, getOverviewPage, getProfilePage } = require('../controllers/viewController');
const { isLoggedIn, protect } = require('../controllers/authController');

const router = express.Router();

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);

router.get('/profile', protect, getProfilePage);

// router.use();
router.get('/overview', protect, isLoggedIn, getOverviewPage);


module.exports = router;