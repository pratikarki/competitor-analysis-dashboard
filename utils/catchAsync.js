module.exports = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
}

//catchAsync will return an anonymous function which will call fn(). 
//fn() returns a promise. in case rejected, error is catched and passed into next function

// const catchAsync = fn => (req, res, next) => {
//   fn(req, res).catch(next);
// }