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



// ---------------- PUSH USERS IN ARRAY ----------------




// ---------------- GET INDEX ----------------
// ROUTES -> /content/
router.get('/', (req, res, next) => {
    user = req.params.user
    Content.find({})
        .populate('owner')
        .then((contents) => {
            res.json({contents})
        })
        .then((contents) => res.status(200).json({contents: contents}))
        .catch(next)

})

// ---------------- DELETE ----------------


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
    user = req.params.user
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
    .populate('owner')
        .then((content) => {
            res.json({content: content})
        })
        .then((content) => res.status(200).json({content:content}))
        .catch(next)
})

// ---------------- UPDATE ----------------
// ROUTES -> /content/:contentId

router.patch('/:contentId', (req, res, next) => {
    const contentId = req.params.contentId
    console.log(` ========= This is CONTENT ID =========`, contentId)
  
    Content.findByIdAndUpdate(contentId, { $set: req.body }, { new: true })
      .then((updatedContent) => {
        if (!updatedContent) {
          throw new Error(`Content with id ${contentId} not found`)
        }
  
        console.log(`========= UPDATED CONTENT =======`, updatedContent)
        res.json({ message: 'Content updated successfully', content: updatedContent })
      })
      .catch(next)
  })
  


module.exports = router