const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelper')

// const MongoDBStore = require('connect-mongo')

const dbUrl = 'mongodb+srv://arpit_kb:fc2AobLhExijApPP@cluster0.vslfl.mongodb.net/YELPCAMP?retryWrites=true&w=majority'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
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
            author: '612e37be522bc700168119fa',
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
                    url: 'https://res.cloudinary.com/ddolxegcu/image/upload/v1630416895/YelpCamp/ssxixrnujurgaucod3fe.jpg',
                    filename: 'YelpCamp/ssxixrnujurgaucod3fe'
                }
            ],

        })
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})