const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewcontroller')

const reviewRouter = require('./../routes/reviewRoutes')



const router = express.Router();

// router.param('id', tourController.checkID);


router.use('/:tourId/reviews', reviewRouter)

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );


  //POST /tour/234fada/reviews
  //GET /tour/234fada/reviews
  // GET /tour/2345f/reviews/94887fd

  // router.route('/:tourId/reviews').post(authController.protect, authController.restrictTo('users'),
  // reviewController.createReview)

module.exports = router;
