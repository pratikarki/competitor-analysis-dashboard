const express = require('express');

const { getAllUsers, getUser, updateUser, deleteUser, bufferPhoto, resizePhoto } = require('../controllers/userController');
const { signup, login, protect, restrictTo, forgotPassword, resetPassword, getInfo, updateInfo, deleteMe, logout, signupOnly, toggleUserStatus } = require('../controllers/authController');

const router = express.Router(); //creating new router which is also a middleware

router.post('/signup', signup);
router.post('/signupOnly', signupOnly);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.route('/update/:id').post(updateUser);

router.route('/').get(getAllUsers); //root of subrouter

//This will protect all routes after this middleware
router.use(protect); 
router.get('/getMyInfo', getInfo, getUser);
router.patch('/updateMyInfo', bufferPhoto, resizePhoto, updateInfo);

//This will restrict all routes only to admin, after this middleware
router.use(restrictTo('admin'));
router.post('/toggleUserStatus/:id', toggleUserStatus);
router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;


//APPENDIX
// router.param('id', functionName); 
//This is param middleware. It only runs for specific parameter i.e. 'id'
