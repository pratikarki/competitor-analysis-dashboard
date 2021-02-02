const Domain = require('../models/domainModel');

exports.getAllDomains = async (req, res) => {
  try {
    // console.log(req.requestTime);
    const allDomains = await Domain.find();

    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      results: allDomains.length,
      data: { allDomains }
    })
  }
  catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }

}

exports.createNewDomain =  (req, res) => {
  Domain.init().then(async function() {
    try {
    // const newDomain = new Domain({})
    // newDomain.save();
      const newDomain = await Domain.create(req.body);

      res.status(201).json({
        status: 'success',
        data: { domain: newDomain }
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

exports.getDomain = async (req, res) => {
  // console.log(req.params);
  try {
    const domain = await Domain.findById(req.params.id)
    //Domain.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: { domain }
    })    
  }
  catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }
}

exports.updateDomain = async (req, res) => {
  try {
    const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: { updatedDomain }
    })
  }
  catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    })
  }

}

exports.deleteDomain = async (req, res) => {
  try {
    await Domain.findByIdAndDelete(req.params.id);

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

