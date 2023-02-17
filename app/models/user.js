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
<<<<<<< HEAD
		description: {
			type: String
=======
		token: String,
		profilePicture: {
			type: String,
			data: Buffer
		},
		coverPicture: {
			type: String,
<<<<<<< HEAD
			data: Buffer
=======
			data: Buffer,
			default: "https://media.istockphoto.com/id/1272917828/photo/trees-in-the-park-in-autumn-on-sunny-day.jpg?s=612x612&w=0&k=20&c=kTvaP_LdgOisnjzPM73pMVYkw_CyIVuKtc0Ux8hePAk="
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
		},
		name: {
			type: String
		},
		description: {
			type: String
		},
		city: {
			type: String
		},
		active: {
<<<<<<< HEAD
			type: Boolean
=======
			type: Boolean,
			default: false
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
		}

	},
	{
		timestamps: true,
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
>>>>>>> ad1f0e8bdf93bbeaf6ccf93610e08e341b3a5502
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

<<<<<<< HEAD
<<<<<<< HEAD
// Converting to Model
const User = model('User', userSchema)

module.exports = User
=======
=======
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081

module.exports = mongoose.model('User', userSchema)
>>>>>>> ad1f0e8bdf93bbeaf6ccf93610e08e341b3a5502
