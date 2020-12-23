const mongoose = require('mongoose');
const dotenv = require('dotenv');

//for uncaught exceptions like x is not defined; used for synchronous code in NodeJS
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); //1 stands for uncaught exception
});

dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('Mongo Database Connection Successful');
  });

//On heroku its necessary to have process.env.PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1); //1 stands for uncaught exception
  });
});
