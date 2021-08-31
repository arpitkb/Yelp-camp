const express = require('express')
const router = express.Router({ mergeParams: true })
const passport = require('passport')
const users = require('../controllers/users')

const catchAsync = require('../utils/catchAsync')


router.route('/register')
    .get(users.registerForm)
    .post(catchAsync(users.addUser))


router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.submitLoginForm)

router.get('/logout', users.logout)

module.exports = router