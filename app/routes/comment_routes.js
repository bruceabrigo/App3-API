const express  = require('express')
const router   = express.Router()
const Comment = require('../models/comment')

// Create Comment
router.post('/comments', async (req, res) => {
    try {
        const comment = await Comment.create(req.body)
        res.status(201).json({ comment })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

// Get all comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find()
        res.status(200).json({ comments })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get one comment
router.get('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comment.findById(id)
        if (comment) {
            return res.status(200).json({ comment })
        }
        res.status(404).send('Comment with the specified ID does not exists')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete comment
router.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Comment.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('Comment deleted')
        }
        throw new Error('Comment not found')
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router