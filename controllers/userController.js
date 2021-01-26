const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    // console.log(req.requestTime);
    const allUsers = await User.find();

    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      results: allUsers.length,
      data: { allUsers }
    })
  }
  catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }

}

exports.createNewUser =  (req, res) => {
  User.init().then(async function() {
    try {
    // const newUser = new User({})
    // newUser.save();
      const newUser = await User.create(req.body);

      res.status(201).json({
        status: 'success',
        data: { user: newUser }
      })
    }
    catch (err) {
      res.status(400).json({
        status: 'Fail',
        message: err
      })
    }
  });
}

exports.getUser = async (req, res) => {
  // console.log(req.params);
  try {
    const user = await User.findById(req.params.id)
    //User.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: { user }
    })    
  }
  catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: { updatedUser }
    })
  }
  catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }

}

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    })
  }
  catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err  
    })
  }
}

