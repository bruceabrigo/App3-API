const express = require('express')
const passport = require('passport')
const Content = require('../models/content')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const errors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const mongoose = require('mongoose')



// ---------------- GET INDEX ----------------
// ROUTES -> /content/
router.get('/', (req, res, next) => { 
    Content.find()
        .populate('owner', 'likes')
        .then((contents) => {
            return contents.map((content) => content.toObject()) //returns all content data saved to db as an object
        })
        .then((contents) => res.status(200).json({contents: contents})) // takes contents as an argument to be viewed as json
        .catch(next)

})

// ---------------- PUSH USERS IN ARRAY ----------------
// ROUTES -> /content/likes/:userId/:conId

router.get('/likes/:userId/:conId', (req,res,next)=> {
    // Need user id and content Id
    user = req.params.userId
    con = req.params.conId
    console.log(`This is userId`, user)
    console.log(`This is contentId`, con)

    Content.findOne({ _id: con })
        .populate('owner', 'likes')
        .then((content) => {
            content.likes.push(user)
            return content.save()
        })
        .then((content) => {
            console.log(content)
            res.status(201)
        })
        .catch(next)
})

// ---------------- SHOW One Content  ----------------
// ROUTES -> /content/<content.id>
router.get('/:id', (req, res, next) => {
    console.log('req.params in SHOW: ', req.params)
    Content.findById(req.params.id) 
        .populate('owner', 'likes')
        .then(handle404)
		.then((content) => res.status(200).json({ content: content.toObject() })) // same as index, instead will return json object of an id specific content in database
        .catch(next)
})

// ---------------- CREATE ----------------
// ROUTES -> /content/
router.post('/', requireToken, (req, res, next) => {
    req.body.content.owner = req.user
    console.log('req.user: ', req.user)
    console.log('content owner: ', req.body)
    Content.create(req.body.content)
        .then((content) => {
            res.status(201).json({content: content.toObject()}) // 201 success on create call to database, key value pair to be created are defined in api call {contents: {material: '<value>'}}
        })
        .catch(next)

})

// ---------------- UPDATE ----------------
// ROUTES -> /content/:contentId
  router.patch('/:contentId', requireToken, removeBlanks, (req, res, next) => {
    console.log('Content id: ', req.params.contentId)
    console.log('req.user: ', req.user)
    Content.findById(req.params.contentId) // pass the id of target content
        .then(handle404)
        // if the content id is found on api call
        // view the json data of content id
        // if user matches the owner of the content id, allow user to delete the post
        .then((content) => {
            console.log('this is the content: ', content)
            requireOwnership(req, content)
            // returned updated value of content
            return content.updateOne(req.body.content)
        })
        .then(() => res.sendStatus(204)) // successful 204 on updated
        .catch(next)
  })

// ---------------- DELETE ----------------

// ROUTES -> /content/delete/<contentId>
router.delete('/delete/:id', requireToken, (req, res, next) => {
    // Need userId to match the owner of the content
    Content.findById(req.params.id)
        .then(handle404)
        .then((content) => {
            // when content is passed, check if token matches that of loggedIn user token
            // if matched, take content.id, and delete from the database
            requireOwnership(req, content)
            content.deleteOne()
        })
        .then(() => res.sendStatus(204)) // send a 204 <no content> on successful delete
        .catch(next)
  });
  



  


module.exports = router