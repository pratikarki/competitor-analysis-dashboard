const express = require('express');
const { getHomePage, getLoginPage, getRegisterPage, getOverviewPage } = require('../controllers/viewController');

const router = express.Router();

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
// router.get('/overview', getOverviewPage);
router.get('/overview/:id', getOverviewPage);

module.exports = router;