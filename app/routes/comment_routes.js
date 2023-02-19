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

router.patch(`/:userId`, (req,res, next)=>{
    const userId = req.params.userId
    Comment.findOneAndUpdate({owner: userId}, {
        usercomment: req.body.usercomment
    })
    .then(handle404)
    .then(comment=> {
        console.log(`UPDATED A NEW COMMENT`, comment)
        res.json({comment: comment})
    })
    .catch(next)
}
)

//------------ Delete Comment ------------------
// Delete ROUTES -> /comments/:userId

router.delete(`/:userId`, (req,res, next)=>{
    const userId = req.params.userId
    Comment.findOneAndDelete({owner: userId})
    .then(handle404)
    .then(comment=> {
        console.log(`DELETED A NEW COMMENT`, comment)
        res.json({comment: comment})
    })
    .catch(next)
}
)

module.exports = router 