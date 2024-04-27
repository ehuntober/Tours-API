// app.js

const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) =>{
    console.log('Hello from the middleware')
    next();
})

app.all('*', (req,res,next) =>{
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl}`
    })
})



// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app; // Export the app object