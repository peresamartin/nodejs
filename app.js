const express = require('express');
const morgan = require('morgan');

const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

//1. middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//2. routes

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;
