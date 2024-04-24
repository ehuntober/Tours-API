const express = require('express')
const tourController = require('./../controllers/tourController')
const router = express.Router();
// })
// router.param('id', (req,res,next, val) =>{
//     console.log(`Tour id is: ${val}`)
//     next()
// })

exports.checkID = (req,res,next,val) =>{
    if(req.para)
}

router
.route('/')
.get(tourController.getAllTours)
    .post(tourController.createTour)
    

router
    .route('/:id')
    .get(tourController.getTour)
   .delete(tourController.deleteTour)
   .patch(tourController.updateTour)
   
   

module.exports = router;