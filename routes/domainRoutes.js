const express = require('express');

// const domainController = require('../controllers/domainController');
const { getAllDomains, createNewDomain, getDomain, updateDomain, deleteDomain } = require('../controllers/domainController');

const router = express.Router(); //creating new router which is also a middleware

router.route('/').get(getAllDomains).post(createNewDomain); //root of subrouter
router.route('/:id').get(getDomain).patch(updateDomain).delete(deleteDomain);

module.exports = router;


//APPENDIX
// router.param('id', functionName); 
//This is param middleware. It only runs for specific parameter i.e. 'id'
