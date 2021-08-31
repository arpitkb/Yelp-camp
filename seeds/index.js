const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelper')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log('Mongo connection error!!')
        console.log(err);
    })

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let a = 0; a < 50; a++) {
        const rand1 = Math.floor(Math.random() * 1000)

        const c = new Campground({
            author: '612a1a41a3b2c95928f05b53',
            location: `${cities[rand1].city}, ${cities[rand1].state}`,
            title: `${random(descriptors)} ${random(places)}`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta ab ducimus eveniet debitis recusandae quas rem distinctio excepturi. Nostrum sint id assumenda recusandae quos? Vel qui exercitationem placeat ratione voluptatum.",
            price: Math.floor(Math.random() * 200) + 120,
            geometry: { type: 'Point', coordinates: [cities[rand1].longitude, cities[rand1].latitude] },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddolxegcu/image/upload/v1630251773/YelpCamp/ibdcjvuvvfvbcbn8zfaq.jpg',
                    filename: 'YelpCamp/ibdcjvuvvfvbcbn8zfaq'
                },
                {
                    url: 'https://res.cloudinary.com/ddolxegcu/image/upload/v1630251779/YelpCamp/vyyg1fyaa9saary2d0pl.jpg',
                    filename: 'YelpCamp/vyyg1fyaa9saary2d0pl'
                }
            ],

        })
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})