
const express = require('express')
const reviewController =  require('./../controllers/reviewcontroller')
const authController = require('./../controllers/authController')

const router = express.Router({mergeParams: true})

router.use(authController.protect);

router.route('/').get(reviewController.getAllReviews)
    .post(
        authController.protect,
        authController.restrictTo('user'),
        reviewController.createReview)

router.route('/:id').delete(reviewController.deleteReview)
router.route('/:id').delete(reviewController.deleteReview)

router.route('/:id').patch(reviewController.updateReview)
     .delete(reviewController.deleteReview)
        


module.exports = router;

