const app = require('./app'); // Import the app object from the app.js file

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});