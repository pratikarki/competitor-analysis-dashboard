//app.js is mainly used for declaring middlwares on routers
const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const domainRouter = require('./routes/domainRoutes');

const app = express();

//1. MIDDLEWARES //these apply for all the routes
app.use(express.json()); //This is a middleware, a function to modify incoming requests 

if(process.env.NODE_ENV === 'development') { //only if environment is development
  app.use(morgan('dev')); //3rd party middleware to view request information in console
}

app.use((req, res, next) => {
  console.log('Hello from middleware.');
  next();
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

//2. ROUTES
//mounting routers on the specific routes.
//app.use('/api/v1/domains', domainRouter); //these are subrouters, implementing the middlwares
app.use('/api/v1/users', userRouter); 
//when request is 'api/v1/users/:id', it'll enter middleware stack. And when it hits this middleware, request is matched and userRouter is run

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