const dotenv = require('dotenv')
const app = require('./app'); // Import the app object from the app.js file


dotenv.config({path: '/config.env'});

// console.log(process.env);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});