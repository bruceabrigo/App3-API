const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new mongoose.Schema(
	{
		profilePicture: {
		  type: String,
		  data: Buffer
		},
		coverPicture: {
			type: String,
			data: Buffer
		},
		followers: [
			{type: Schema.Types.ObjectId,
			ref: 'User'} 
		],
		followings: [
			{type: Schema.Types.ObjectId,
			ref: 'User'} 
		],
		username: { 
			type: String, 
			required: true, 
			unique: true 
		},
		password: { 
			type: String, 
			required: true 
		},
		email: {
			type: String, 
			required: true 
		},
		password_confirmation: {
			type: String
		},
		description: {
			type: String
		},
		city: {
			type: String
		},
		active: {
			type: Boolean
		}
	
	  }, {
		  timestamps: true,
		  toObject: { virtuals: true },
		  toJSON: { virtuals: true }
	  }
)

// Converting to Model
const User = model('User', userSchema)

module.exports = User
