const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isloggedin, isAuthor, validatorCamp } = require('../middleware')
// const { populate } = require('../models/review')
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isloggedin, upload.array('image'), validatorCamp, catchAsync(campgrounds.createForm))

router.get('/new', isloggedin, catchAsync(campgrounds.renderNewForm))

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isloggedin, isAuthor, upload.array('image'), validatorCamp, catchAsync(campgrounds.updateCampground))
    .delete(isloggedin, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isloggedin, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router