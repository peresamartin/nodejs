/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTED');
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successfully');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION');
  server.close(() => {
    process.exit(1);
  });
});
