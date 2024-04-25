const fs = require('fs');
const mongoose = require('mongoose'); // Corrected here
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './../../config.env' });

// READ JSON FILE
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

const dbConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        // Add any additional options for the connection here
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.log('Database error', error);
    }
  };
  
  dbConnect();

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log(`Data Successfully loaded`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany(tours);
    console.log(`Data Successfully deleted`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv)