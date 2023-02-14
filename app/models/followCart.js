const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const followCartSchema = new mongoose.Schema(
{
    followers: [
        {type: Schema.Types.ObjectId,
        ref: 'User'} 
    ],
    followings: [
        {type: Schema.Types.ObjectId,
        ref: 'User'} 
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
)

module.exports = mongoose.model('FollowCart', followCartSchema)