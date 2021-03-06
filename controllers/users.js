const User = require('../models/user')

module.exports.registerForm = (req, res) => {
    res.render('user/register')
}

module.exports.addUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ username, email })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Yelp-camp')
            res.redirect('/campgrounds')
        })
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.loginForm = (req, res) => {
    res.render('user/login')
}

module.exports.submitLoginForm = (req, res) => {
    req.flash('success', 'Welcome back')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logOut();
    req.flash('success', 'Goodbyee')
    res.redirect('/')
}