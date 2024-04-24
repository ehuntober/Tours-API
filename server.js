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


const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true,'A tour must have a price']
    }
})


const  Tour = mongoose.model('Tour', tourSchema);

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