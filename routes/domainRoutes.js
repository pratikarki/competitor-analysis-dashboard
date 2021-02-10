const express = require('express');

const { getAllDomains, createNewDomain, getDomain, updateDomain, deleteDomain } = require('../controllers/domainController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router(); //creating new router which is also a middleware

router.route('/')
  .get(protect, getAllDomains)
  .post(createNewDomain); //root of subrouter

router.route('/:id')
  .get(getDomain)
  .patch(updateDomain)
  .delete(protect, restrictTo('admin'), deleteDomain); //restrictTo('admin')

module.exports = router;


//APPENDIX
// router.param('id', functionName); 
//This is param middleware. It only runs for specific parameter i.e. 'id'
