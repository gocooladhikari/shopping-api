const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = require('./Post').model('posts').schema


const categorySchema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    posts: [postSchema]
})


const Category = mongoose.model('categories', categorySchema)

module.exports = Category
