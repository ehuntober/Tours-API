// app.js

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app; // Export the app object