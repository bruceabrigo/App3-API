const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {  
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    username: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Comment', commentSchema)
//
// // Seed comments
//
// const seed = async () => {
//   const users = await User.find();
//   const comments = [
//     {
//       text: 'This is a comment',