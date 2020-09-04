const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()

require('./config/passport')(passport)

// Database Connection
// 'mongodb://localhost:27017/grocessory'
// mongodb+srv://find-my-pet:findmypet123@cluster0-sspip.mongodb.net/grocessory?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://gocool:gocool@cluster0.3ujkq.mongodb.net/shopping?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('DB connected!!!')
})


const app = express()
const PORT = process.env.PORT || 5050


app.use(cors())

// body parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/uploads', express.static('uploads'))
app.use('/uploads', express.static('./uploads'))


// Express session
app.use(
    session({
        secret: 'mygrocessoryapp',
        resave: true,
        saveUninitialized: true
    })
)

// Passport 
app.use(passport.initialize())
app.use(passport.session())


// routes handlers
app.use('/user', require('./routes/users'))
app.use('/post', require('./routes/posts'))
app.use('/admin', require('./routes/admin'))


app.get('/', (req, res) => {
    res.send('Server Working!!!')
})

app.listen(PORT, console.log('Server started on port: ' + PORT))