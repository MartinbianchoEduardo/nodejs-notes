//this file has the goal of loading pre-defined data into the database
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

const DB =
  'mongodb+srv://dudu:n9ddVHYV9rlwELM9@cluster0.bxp3thr.mongodb.net/natours?retryWrites=true&w=majority';

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany(); //delete all
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

//to import enter in the console:
// $node dev-data/data/import-dev-data.js --import
//or to delete:
// $node dev-data/data/import-dev-data.js --delete
