const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const commentSchema = require('./comments')

const contentSchema = new mongoose.Schema(
    {
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
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
  
    }, {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
  )

module.exports = mongoose.model('Content', contentSchema)