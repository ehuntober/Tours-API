const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const app = express();


app.use(morgan('dev'))
app.use(express.json())


app.use((req,res,next)=>{
    console.log('Hello from the middleware')
    next();
})

// app.use((req,res, next)=>{
//     req.requestTime = new Date.toISOString;
//     next()
// })

// app.get('/', (req,res) =>{
    //     res.status(200).json({
        //         message: 'Hello from the server side!',
//      app: 'Natours'});
// })

// app.post('/',(req,res) =>{
//     res.send('You can post to this endpoint...')



const getAllUsers = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

const getUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

const createUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

const updateUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

const deleteUser = (req,res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

// app.get('/api/v1/tours',getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours',createTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',)
// app.patch('/api/v1/tours/id')


// ROUTES
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter);



   const port = 3000;
   app.listen(port, () =>{
    console.log(`App running on port ${port}`)
});