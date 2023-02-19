const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,
		profilePicture: {
			type: String,
			data: Buffer
		},
		coverPicture: {
			type: String,
			data: Buffer,
			default: "https://media.istockphoto.com/id/1272917828/photo/trees-in-the-park-in-autumn-on-sunny-day.jpg?s=612x612&w=0&k=20&c=kTvaP_LdgOisnjzPM73pMVYkw_CyIVuKtc0Ux8hePAk="
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
			type: Boolean,
			default: false
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
		},
	}
)


module.exports = mongoose.model('User', userSchema)