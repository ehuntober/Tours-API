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



const testTour = new Tour({
    name: 'The Park Camper',
    // rating: 4.7,
    price: 497
})
testTour.save().then(doc=>{
    console.log(doc)
}).catch(err=>{
    console.log(err)
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});