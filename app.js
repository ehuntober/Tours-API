const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

// Correct the import paths for tourRouter and userRouter
const tourRouter = require('./routes/tourRoutes'); // Add require()
const userRouter = require('./routes/userRoutes'); // Add require()

const app = express();

app.use(morgan('dev'));
app.use(express.json());




   const port = 3000;
   app.listen(port, () =>{
    console.log(`App running on port ${port}`)
});