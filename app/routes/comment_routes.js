////////////// Comment Routes /////////
const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const errors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const mongoose = require('mongoose')
const Comment = require(('../models/comment'))




// ---------------- GET INDEX ----------------
// ROUTES -> /comments/

router.get('/', (req, res, next)=> {
    Comment.find({})
        .then(handle404)
        .then(comment=> {
            res.json({comment: comment})
        })
        .catch(next)
})

// ---------------- Create Comment ----------------
// ROUTES -> /comments/:userId

router.post(`/:userId`, (req,res, next)=>{
    const userId = req.params.userId
    Comment.create({
        owner: userId,
        usercomment: req.body.usercomment
    })
    .then(handle404)
    .then(comment=> {
        console.log(`CREATED A NEW COMMENT`, comment)
        res.json({comment: comment})
    })
    .catch(next)
})

//------------ UPDATE Comment ------------------
// PATCH ROUTES -> /comments/:userId

router.patch('/:commentId', requireToken, removeBlanks, (req, res, next) => {
    console.log('Comment id: ', req.params.commentId)
    console.log('req.usercomment: ', req.usercomment)
    Comment.findById(req.params.commentId) // pass the id of target content
        .then(handle404)
        .then((comment) => {
            console.log('this is the content: ', comment)
            requireOwnership(req, comment) // check if user owns content
            // returned updated value of content
            return comment.updateOne(req.body.comment)
        })
        .then(() => 
        res.sendStatus(204)) // successful 204 on updated 
        .catch(next)
  })

//------------ Delete Comment ------------------
// Delete ROUTES -> /comments/:userId

router.delete('/delete/:id', requireToken, (req, res, next) => {
    // Need userId to match the owner of the content
    Comment.findById(req.params.id)
        .then(handle404)
        .then((comment) => {
            // when content is passed, check if token matches that of loggedIn user token
            // if matched, take content.id, and delete from the database
            requireOwnership(req, comment)
            comment.deleteOne()
        })
        .then(() => res.sendStatus(204)) // send a 204 <no content> on successful delete
        .catch(next)
  })

module.exports = router 