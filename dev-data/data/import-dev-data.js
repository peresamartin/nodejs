/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-require */
/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

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

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8'),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Date successfully loaded');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Date successfully deleted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
