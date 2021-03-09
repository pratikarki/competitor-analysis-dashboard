const AppError = require("../utils/appError");

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
  let message = '';
  if (err.keyValue.userName) {
    message = `Duplicate userName: '${err.keyValue.userName}'. Sorry, the username is already taken`;
  }
  else if (err.keyValue.email) {
    message = `Duplicate email: '${err.keyValue.email}'. Sorry, the email has already been used`;
  }
  else if (err.keyValue.name) {
    message = `Duplicate Domain Name: '${err.keyValue.name}'. Domain cannot be duplicate in database`;
  }
  else if (err.keyValue.url) {
    message = `Duplicate Url: '${err.keyValue.url}'. Url cannot be duplicate in database`;
  }
  else if (err.keyValue.message) {
    message = 'Seems like we already have that exact same message, Please send us something new';
  }
  return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
  const errorMessages = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errorMessages.join('. ')}`;
  return new AppError(message, 400);
}

const handleJWTError = () => new AppError('Invalid token! Please log in again.', 401);

const handleJWTExpiredError = () => new AppError('Your token is expired! Please log in again.', 401);

const sendDevelopmentError = (err, req, res) => { //for sending detailed response
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
  }
  // RENDERED WEBSITE
  console.error('ERROR', err); 
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  })
}

const sendProductionError = (err, req, res) => { //for sending less detailed response
  // API
  if (req.originalUrl.startsWith('/api')) {
    // if error is operational i.e. known error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })    
    }
    // if error is unknown/unexpected: dont send details to client, rather log the error and send generic message
    console.error('ERROR', err); 
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    })
  }
  // RENDERED WEBSITE
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    })    
  }
  // if error is unknown/unexpected: dont send details to client, rather log the error and send generic message
  console.error('ERROR', err); 
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  })
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') { //if error is in development
    sendDevelopmentError(err, req, res);
  }
  else if (process.env.NODE_ENV === 'production') { //if error is in production
    let error = JSON.parse(JSON.stringify(err));

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    if (!error.message) error.message = err.message;
    sendProductionError(error, req, res);
  }
}