//////////////// COMMENT SCHEMA ////////

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const commentSchema = require('./comments')
const commentSchema = new mongoose.Schema(
    {
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      usercomment: {
          type: String,
          
      }
    }
  )

  module.exports = mongoose.model('Comment', commentSchema)