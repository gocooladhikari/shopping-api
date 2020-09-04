const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = require('./Post').model('posts').schema


const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    cart: [postSchema]
})

const User = mongoose.model('user', userSchema)
module.exports = User