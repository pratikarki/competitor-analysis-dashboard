const express = require('express');

const { getAllUsers, createNewUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { signup, login, protect, forgotPassword, resetPassword, updateInfo, deleteMe } = require('../controllers/authController');

const router = express.Router(); //creating new router which is also a middleware

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyInfo', protect, updateInfo);
router.delete('/deleteMe', protect, deleteMe);

router.route('/')
  .get(getAllUsers)
  .post(createNewUser); //root of subrouter

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;


//APPENDIX
// router.param('id', functionName); 
//This is param middleware. It only runs for specific parameter i.e. 'id'
