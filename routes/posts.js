const router = require('express').Router()
const multer = require('multer')
const slugify = require('slugify')
const User = require('../models/User')
const Category = require('../models/Category')
const Post = require('../models/Post')


const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth')


// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter
})

// Display all items
router.route('/').get((req, res) => {
    Post.find().then(posts => {
        res.send(posts)
    }).catch(err => res.send(err))
 })

 // List of all category
router.route('/category').get((req, res) => {
    const name = []
   Category.find().select('_id name').then(data => {
        // for(var i = 0; i < data.length; i++){
        //     name.push(data[i].name)
        // }

        // res.send(name)

        if(!data){
            res.send('nothing to display')
        }else{
            res.send(data)
        }
   }).catch(err => res.send(err))

})


// Post inside a specific category
router.route('/category/:slug/posts').get((req, res) => {
    Category.findOne({slug: req.params.slug}).then(data => {
        if(!data){
            res.send('No data')
        }else{
            res.send(data.posts)
        }
    }).catch(err => res.send(err))
})


// Posting a category
router.route('/category/add').post((req, res) => {
    const name = req.body.name
    const nameSlug = slugify(name, {lower: true, strict: true})
    Category.findOne({slug: nameSlug}).then(data => {
        if(data){
            res.send(name + ' category already exists in database')
        }else{
            const newCategory = new Category({
                name,
                slug: nameSlug
            })

            newCategory.save().then(data => {
                res.send(data)
            }).catch(err => res.send(err))

        }
    }).catch(err => res.status(500).send('Internal Server Error'))
})






module.exports = router