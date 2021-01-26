const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' }); //Loads .env file contents into process.env
// console.log(process.env);

//1. CONNECT DATABASE
const dbConnectionString = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
.then(() => console.log('DB connection successful.'));

//2. START SERVER
const port = process.env.port || 7000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
