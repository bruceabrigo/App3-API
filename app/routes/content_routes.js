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

// ---------------- CREATE ----------------
router.post('/content/:user', (req, res, next) => {
    user = req.params.user
    Content.create(
        req.body.content
    )
        .then((content) => {
            res.status(201).json({content: content.toObject()})
        })
        .catch(next)

})
// GET INDEX
router.get('/content', (req, res, next) => {
    user = req.params.user
    Content.find({})
        .then((contents) => {
            res.json({contents})
        })
        .then((contents) => res.status(200).json({contents: contents}))
        .catch(next)

})
// ---------------- SHOW One Content  ----------------

// ---------------- UPDATE ----------------

// ---------------- DELETE ----------------


module.exports = router