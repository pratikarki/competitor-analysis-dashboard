const express = require('express');

const { getAllUsers, createNewUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { signup, login, protect, restrictTo, forgotPassword, resetPassword, getInfo, updateInfo, deleteMe } = require('../controllers/authController');

const router = express.Router(); //creating new router which is also a middleware

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

//This will protect all routes after this middleware
router.use(protect); 

router.get('/getMyInfo', getInfo, getUser);
router.patch('/updateMyInfo', updateInfo);
router.delete('/deleteMe', deleteMe);

//This will restrict all routes only to admin, after this middleware
router.use(restrictTo('admin'));

router.route('/') //root of subrouter
  .get(getAllUsers)
  .post(createNewUser);

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;


//APPENDIX
// router.param('id', functionName); 
//This is param middleware. It only runs for specific parameter i.e. 'id'
