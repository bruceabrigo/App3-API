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
    Content.find({})
        .populate('owner', 'likes')
        .then((contents) => {
            res.json({contents})
        })
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

// ---------------- DELETE ----------------
// ROUTES -> /content/delete/:contentId

router.delete('/delete/:contentId', (req, res, next) => {
    // Need userId to match the owner of the content
    const contentId = req.params.contentId;
    Content.deleteOne({ _id: contentId })
      .then((content) => {
        console.log(content)
        res.status(200).json({ message: 'Content deleted successfully' });
      })
      .catch(next);
  });
  

// ---------------- CREATE ----------------
// ROUTES -> /content/:user
router.post('/:user', (req, res, next) => {
    user = req.params.userId
    req.body.content.owner = req.userId
    console.log('content owner: ', req.body)
    console.log('user in post: ', user)
    Content.create(req.body.content)
        .then((content) => {
            res.status(201).json({content: content.toObject()})
        })
        .catch(next)

})

// ---------------- SHOW One Content  ----------------
// ROUTES -> /content/:user
router.get('/:user', (req, res, next) => {
    user = req.params.user
    Content.findById(user)
        // .populate('owner', 'likes')
        // .then((content) => {
        //     res.json({content: content})
        // })
        .then((content) => res.status(200).json({content:content}))
        .catch(next)
})

// ---------------- UPDATE ----------------
// ROUTES -> /content/:contentId

router.patch('/:contentId', requireToke, removeBlanks, (req, res, next) => {
    delete req.body.content.owner

    Content.findById(req.params.id)
        .then(handle404)
        .then((content))
  })
  


module.exports = router