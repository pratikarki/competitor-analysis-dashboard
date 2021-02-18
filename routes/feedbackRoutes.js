const express = require('express');

const { getAllFeedbacks, createNewFeedback, getFeedback, deleteFeedback, setUserId } = require('../controllers/feedbackController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router(); //creating new router which is also a middleware

//This will protect all routes after this middleware
router.use(protect);

router.route('/') //root of subrouter
  .get(restrictTo('admin'), getAllFeedbacks)
  .post(restrictTo('user'), setUserId, createNewFeedback);

//This will restrict all routes only to admin, after this middleware
router.use(restrictTo('admin'));

router.route('/:id')
  .get(getFeedback)
  .delete(deleteFeedback);

module.exports = router;
