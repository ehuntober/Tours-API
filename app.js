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
// })
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
    );

const getAllTours = (req,res) =>{
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{
            tours
        }
    })
}

const getTour = (req,res) =>{
    const id = req.params.id * 1;

    const tour = tours.find(el=> el.id === id);
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'sucess',
        data:{
            tours: tour
        }
    });
    
}

const createTour =(req,res) =>{
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId},req.body)

    tours.push(newTour)
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=>{
        res.status(201).json({
            status: 'success',
            data:{
                tour: newTour
            }
        })
    }) 
}


const updateTour = (req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(200).json({
        status: "success",
        data:{
            tour: 'Updated tour here'
        }
    })
}

const deleteTour = (req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(204).json({
        status: "success",
        data:null
    })
}


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
const tourRouter = express.Router();
const userRouter = express.Router()
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter)

tourRouter
.route('/')
.get(getAllTours)
    .post(createTour)
    

    tourRouter
    .route('/:id')
    .get(getTour)
   .delete(deleteTour)
   .patch(updateTour)
   
   

   userRouter.route('/api/v1/users')
   .get(getAllUsers)
   .post(createUser)


   userRouter.route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)



   const port = 3000;
   app.listen(port, () =>{
    console.log(`App running on port ${port}`)
});