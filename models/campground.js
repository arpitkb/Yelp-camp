const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Review = require('./review')

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})


const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

CampgroundSchema.virtual('properties.popupID').get(function () {
    return `${this._id}`
})
CampgroundSchema.virtual('properties.popupTitle').get(function () {
    return `${this.title}`
})


CampgroundSchema.post('findOneAndDelete', async (campground) => {
    if (campground.reviews.length) {
        await Review.deleteMany({ _id: { $in: campground.reviews } })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)