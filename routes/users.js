const router = require('express').Router()
const passport = require('passport')

const User = require('../models/User')
const { ensureAuthenticated } = require('../config/auth')


router.route('/').get((req, res) => {
    User.find().then(users => {
        res.send(users)
    }).catch(err => res.status(500).send(err))
})

// User registration route
router.route('/register').post((req, res) => {
    const{email, password, password2} = req.body
    // const profilepic = 
    User.findOne({email: email}).then(user => {
        if(user){
            res.send('Email already exists')
        }else{
            if(password !== password2){
                res.send('passwords dont match')
            }else{
                const newUser = new User({ 
                    email,
                    password
                })

                newUser.save().then(user => {
                    res.json(user)
                }).catch(err => res.send(err))
            }
        }
    }).catch(err => res.status(500).send('Server Error'))
})


// User login route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
})

// User logout 
router.route('/logout').get(ensureAuthenticated, (req, res) => {
    req.logout()
    res.send('Logged Out')
})


module.exports = router