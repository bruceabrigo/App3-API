//// part 1 - Connections
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const commentSchema = require('./comments')


//// Part 2 -> Schema 
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

  // Part 3 -> Model and Export
module.exports = mongoose.model('Content', contentSchema)