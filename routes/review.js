const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const { validatorRev, isloggedin, isReviewAuthor } = require('../middleware')

const reviews = require('../controllers/reviews')


//post review
router.post('/', isloggedin, validatorRev, catchAsync(reviews.postReview))

//deleting review
router.delete('/:reviewId', isloggedin, isReviewAuthor, catchAsync(reviews.delete))


module.exports = router