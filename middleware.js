const Campground = require('./models/campground')
const Review = require('./models/review')
const { campgroundSchema, reviewSchema } = require('./validatorSchemas')
const expressError = require('./utils/expressError')

module.exports.isloggedin = (req, res, next) => {
    // console.log(req.user)
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in')
        return res.redirect('/login')
    }
    else next()
}


module.exports.validatorCamp = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const mssg = error.details.map(el => el.message).join(',')
        throw new expressError(mssg, 400)
    }
    else next()
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'Permission denied')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Permission denied')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}


module.exports.validatorRev = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const mssg = error.details.map(el => el.message).join(',')
        throw new expressError(mssg, 400)
    }
    else next()
}