//app.js is mainly used for declaring middlwares on routers
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const domainRouter = require('./routes/domainRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1. GLOBAL MIDDLEWARES //these apply for all the routes
app.use(express.static(path.join(__dirname, 'public'))) //for serving static files inside public folder

//Set security HTTP headers
// app.use(helmet());

//View request information in console using 3rd party middleware 'morgan'
if(process.env.NODE_ENV === 'development') { //only if environment is development
  app.use(morgan('dev'));
}

//Limit requests from same IP
const limiter = rateLimit({ //it allows upto 150 requests in 1 hour from the same IP 
  max: 150,
  windowMs: 60 * 60 * 1000, //converting to milliseconds
  message: 'Too many requests from this IP, please try again in an hour.'
})
app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS (Cross Side Scripting)
app.use(xss());

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
})


//2. ROUTES
//mounting routers on the specific routes.
app.use('/', viewRouter); //these are subrouters, implementing the middlewares
app.use('/api/v1/domains', domainRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/feedbacks', feedbackRouter);
//when request is 'api/v1/users/:id', it'll enter middleware stack. And when it hits this middleware, request is matched and userRouter is run

//if none of the routes match, following middlewares are run to handle 404 error

app.all('*', (req, res, next) => {
  const err = new AppError(`Can not find ${req.originalUrl} on this server!`, 404);
  next(err);
})

//Global Error Handling Middleware
app.use(globalErrorHandler);


module.exports = app;

//FLOW OF THE APPLICATION
//1. Server is run.
//2. We receive the request in app.js file.
//3. According to the route, we enter the router.
//4. Again, according to the route, router calls one of the get/post/patch/delete methods with its function inside.
//5. The functions are imported from controller files.
//6. Then,
//7. When the function is called, it finally sends the response and finishes the request-response cycle.



//APPENDIX
//get method is sent to the server in '/' URL and then res.... response is sent back for that URL
// app.get('/', (req, res) => { //get is just http method for request
//   res.status(200).json({ app: 'natours', message: 'Hello from the server!' }); //this is sending response
// });


// app.get('/api/v1/users', getAllUsers);
// app.post('/api/v1/users', createNewUser);
// app.get('/api/v1/users/:id', getUser);
// app.patch('/api/v1/users/:id', updateUser);
// app.delete('/api/v1/users/:id', deleteUser);