const express = require('express');

const { getAllDomains, createNewDomain, getDomain, updateDomain, deleteDomain } = require('../controllers/domainController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router(); //creating new router which is also a middleware

//This will protect all routes after this middleware
router.use(protect); 

router.route('/') //root of subrouter
  .get(restrictTo('admin'), getAllDomains)
  .post(restrictTo('user'), createNewDomain);

router.route('/:id')
  .get(getDomain)
  .patch(updateDomain)
  .delete(restrictTo('admin'), deleteDomain);

module.exports = router;


//APPENDIX
// router.param('id', functionName); 
//This is param middleware. It only runs for specific parameter i.e. 'id'
