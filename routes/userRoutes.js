const express = require('express');

// const userController = require('../controllers/userController');
const { getAllUsers, createNewUser, getUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router(); //creating new router which is also a middleware

router.route('/').get(getAllUsers).post(createNewUser); //root of subrouter
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;


//APPENDIX
// router.param('id', functionName); 
//This is param middleware. It only runs for specific parameter i.e. 'id'
