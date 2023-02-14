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
    Content.create(req.body.content)
        .then((content) => {
            res.status(201).json({content: content.toObject()})
        })
        .catch(next)

})
// GET INDEX
router.get('/content', (req, res, next) => {
    user = req.params.user
    Content.find({})
        .populate('owner')
        .then((contents) => {
            res.json({contents})
        })
        .then((contents) => res.status(200).json({contents: contents}))
        .catch(next)

})
// ---------------- SHOW One Content  ----------------
router.get('/content/:user', (req, res, next) => {
    user = req.params.user
    Content.findById(user)
    .populate('owner')
        .then((content) => {
            res.json({content: content})
        })
        .then((content) => res.status(200).json({content:content}))
        .catch(next)
})

// ---------------- UPDATE ----------------
router.patch('/:contentId', (req, res, next) => {
	const contentId = req.content
	console.log(` ========= This is CONTENT =========`, contentId)


  
	// Content.findByIdAndUpdate(contentId, { $set: req.body.content }, { new: true })
	//   .then((updatedContent) => {
	// 	if (!updatedContent) {
	// 	  throw new Error(`User with id ${updatedContent} CONTENT not found`)
	// 	}
  
	// 	console.log(`========= UPDATED USER =======`, updatedContent);
	// 	res.json({ message: 'Content updated successfully', content: updatedContent })
	//   })
    //   .then(() => res.sendStatus(204))
	//   .catch(next)
})
// ---------------- DELETE ----------------


module.exports = router