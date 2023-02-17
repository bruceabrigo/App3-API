const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const commentSchema = require('./comments')

const contentSchema = new mongoose.Schema(
    {
      img: {
        type: String,
        data: Buffer,
      }, 
      material: {
        type: String
      },
      likes: [
        {type: Schema.Types.ObjectId,
          ref: 'User'} 
        ],
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }, 
    }, {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
  )

module.exports = mongoose.model('Content', contentSchema)