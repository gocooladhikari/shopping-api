const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    picture: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    price: {type: Number}
})

const Post = mongoose.model('posts', postSchema)
module.exports = Post