// const fs = require('fs')

const Tour = require('./../models/tourModel')
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//     );


    // exports.checkID = (req,res,next,val) =>{
    //     if(req.params.id * 1 > tours.length){
    //         return res.status(404).json({
    //             status: 'fail',
    //             message: 'Invalid ID'
    //         })
    //     }
    //     next()
    // }
    
exports.checkBody = (req,res,next) =>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: "fail",
            message: 'Missing name or price'
        })
    }
    next();
}

exports.aliasTopTours = (req,res,next) =>{
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary, difficulty';
  next();
}

class APIFeatures{
  constructor(query,queryString){
    this.query = query;
    this.queryString = queryString
  }

  filter(){
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  this.query.find(JSON.parse(queryStr))
    // let query = Tour.find(JSON.parse(queryStr));

  }
}

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) Filtering
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // // 1B) Advanced filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join('');
      query = query.sort(sortBy)
    } else{
      query = query.sort('-createdAt')
    }

    // 3) Field limiting
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else{
      query = query.select('-__v')
    }

    // 4) pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit *1 || 100
    const skip = (page -1) * limit

    // page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page3

    query = query.skip(skip).limit(limit)

    if(req.query.page){
      const numTours = await Tour.countDocuments();
      if(skip >= numTours) throw new Error('This page does not exist')
    }


    // EXECUTE QUERY
    const tours = await query.exec();
    // query.sort().select().skip().limit()

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
    console.log(err);
  }
};

exports.getTour = async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
  
      if (!tour) {
        return res.status(404).json({
          status: 'fail',
          message: 'Tour not found',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
  };

exports.createTour = async(req,res) =>{
    // const newId = tours[tours.length - 1].id + 1;
    // const newTour = Object.assign({id: newId},req.body)

    // tours.push(newTour)
    
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=>{
    // //     res.status(201).json({
    //         status: 'success',
    //         data:{
    //             tour: newTour
    //         }
    //     })
    // }) 
    // const 

    // res.status(201).json({
    //     status: 'Success'
    // })

    try{
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'Success',
            data:{
                tour: newTour
            }
        })

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })


    }
}


exports.updateTour = async(req,res)=>{
    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     });
    // }
    
    // res.status(200).json({
    //     status: "success",
    //     data:{
    //         tour: 'Updated tour here'
    //     }
    // })

    try{
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
        status: 'Success',
        data: {
            tour
        }
      })
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })

    }
}

exports.deleteTour = async (req,res)=>{
    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     });
    // }

    try{
      await  Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data:null
        })
    }
    catch(err){
     res.status(404).json({
        status: 'fail',
        message: err
     })
    }
}
