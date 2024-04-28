const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

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




const port = 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
