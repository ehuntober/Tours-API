const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tourSchema = require('./../../models/tourModel'); // Import the schema

dotenv.config({ path: './../../config.env' });

// Connect to MongoDB
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

// Define the Tour model
const Tour = mongoose.model('Tour', tourSchema);

// READ JSON FILE
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    const toursData = JSON.parse(tours);
    await Tour.create(toursData);
    console.log(`Data Successfully loaded`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
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