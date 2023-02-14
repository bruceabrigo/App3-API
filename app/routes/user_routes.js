const express = require('express')
const crypto = require('crypto')
const passport = require('passport')
const bcrypt = require('bcrypt')

const bcryptSaltRounds = 10

/////// ERROR HANDLERS ///////////////////
const errors = require('../../lib/custom_errors')

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

const User = require('../models/user')
const requireToken = passport.authenticate('bearer', { session: false })

///////// ROUTER //////////////////////////
const router = express.Router()

//================================= GET ALL USERS =========================
// GET - /
router.get('/', (req,res,next)=> {
	User.find({})
		.then(errors.handle404)
		.then((users)=> {
			console.log(`--------THESE ARE ALL THE USERS--------`, users)
			res.json({users: users})
		})
})


//=================================== SIGN UP ================================
// POST /sign-up
router.post('/sign-up', (req, res, next) => {

	Promise.resolve(req.body.credentials)
		.then((credentials) => {
			console.log(credentials)
			if (
				!credentials ||
				!credentials.password ||
				credentials.password !== credentials.password_confirmation

			) {
				throw new BadParamsError()
			}
		})
		.then(() => bcrypt.hash(req.body.credentials.password, bcryptSaltRounds))
		.then((hash) => {
			return {
				email: req.body.credentials.email,
				hashedPassword: hash,
				city: req.body.credentials.city,
				profilePicture: req.body.credentials.profilePicture ,
				coverPicture: req.body.credentials.coverPicture,
				name: req.body.credentials.name ,
				description: req.body.credentials.description ,
				active: req.body.credentials.active
			}
		})
		.then((user) => User.create(user))
		.then((user) => res.status(201).json({ user: user.toObject() }))
		.catch(next)
})

// ================================ SIGN IN ================================
// POST /sign-in
router.post('/sign-in', (req, res, next) => {
	const pw = req.body.credentials.password
	let user

	
	User.findOne({ email: req.body.credentials.email })
		.then((record) => {
			if (!record) {
				throw new BadCredentialsError()
			}
			user = record
			return bcrypt.compare(pw, user.hashedPassword)
		})
		.then((correctPassword) => {
			if (correctPassword) {
				const token = crypto.randomBytes(16).toString('hex')
				user.token = token
				return user.save()
			} else {
				throw new BadCredentialsError()
			}
		})
		.then((user) => {
			res.status(201).json({ user: user.toObject() })
		})
		.catch(next)
})

// ================================ CHANGE password ================================
// PATCH /change-password
router.patch('/change-password', requireToken, (req, res, next) => {
	let user
	User.findById(req.user.id)
	
		.then((record) => {
			user = record
		})
		.then(() => bcrypt.compare(req.body.passwords.old, user.hashedPassword))
		.then((correctPassword) => {
			if (!req.body.passwords.new || !correctPassword) {
				throw new BadParamsError()
			}
		})
		.then(() => bcrypt.hash(req.body.passwords.new, bcryptSaltRounds))
		.then((hash) => {
			user.hashedPassword = hash
			return user.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// ================================ SIGN OUT ================================
// DELETE /sign-out
router.delete('/sign-out', requireToken, (req, res, next) => {
	req.user.token = crypto.randomBytes(16)
	req.user
		.save()
		.then(() => res.sendStatus(204))
		.catch(next)
})

// ================================ UPDATE ================================
// PUT /update


router.patch('/update', requireToken, (req, res, next) => {
	// using userId to avoid using it directly in find to avoid '_.id' issues
	const userId = req.user.id
	console.log(` ========= This is USERID =========`, userId)
  
	User.findByIdAndUpdate(userId, { $set: req.body.credentials }, { new: true })
	  .then((updatedUser) => {
		if (!updatedUser) {
		  throw new Error(`User with id ${userId} not found`)
		}
  
		console.log(`========= UPDATED USER =======`, updatedUser);
		res.json({ message: 'User updated successfully', user: updatedUser })
	  })
	  .catch((err) => {
		console.error(err)
		res.status(500).json({ message: err.message })
	  })
  })

  

module.exports = router
