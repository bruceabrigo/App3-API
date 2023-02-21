const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema(
    {    
        usercomment: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)