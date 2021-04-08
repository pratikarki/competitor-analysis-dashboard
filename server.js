const mongoose = require('mongoose');
const dotenv = require('dotenv');

//TO HANDLE UNCAUGHT EXCEPTION
process.on('uncaughtException', err => {
  console.log('Uncaught Exception, Exiting the application..');
  console.log(err.name, err.message);
  process.exit(1);
})

dotenv.config({ path: './config.env' }); //Loads .env file contents into process.env //console.log(process.env);
const app = require('./app');

//1. CONNECT TO DATABASE
const dbConnectionString = process.env.DATABASE;
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
.then(() => console.log('DB connection successful.'));

//2. START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//TO HANDLE UNHANDLED REJECTION
process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection, Exiting the application..');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  })
})