const AppError = require("../utils/appError");

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
  let message = '';
  if (err.keyValue.userName) {
    message = `Duplicate userName: '${err.keyValue.userName}'. Please use another user name!`;
  }
  else if (err.keyValue.email) {
    message = `Duplicate email: '${err.keyValue.email}'. Please use another email!`;
  }
  else if (err.keyValue.name) {
    message = `Duplicate Domain Name: '${err.keyValue.name}'. Please use another domain name!`;
  }
  else if (err.keyValue.url) {
    message = `Duplicate Url: '${err.keyValue.url}'. Please use another Url!`;
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

const sendDevelopmentError = (err, res) => { //for sending detailed response
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendProductionError = (err, res) => { //for sending less detailed response
  // if error is operational i.e. known error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })    
  }
  // if error is unknown/unexpected: dont send error details to client, rather log the error
  else {
    console.info('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') { //if error is in development
    sendDevelopmentError(err, res);
  }
  else if (process.env.NODE_ENV === 'production') { //if error is in production
    let error = JSON.parse(JSON.stringify(err));

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    if (!error.message) error.message = err.message;
    sendProductionError(error, res);
  }
}