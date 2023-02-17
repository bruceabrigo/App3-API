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
<<<<<<< HEAD
// GET - /
=======
// GET 
// ROUTE -> /
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
router.get('/', (req,res,next)=> {
	User.find({})
		.then(errors.handle404)
		.then((users)=> {
			console.log(`--------THESE ARE ALL THE USERS--------`, users)
			res.json({users: users})
		})
<<<<<<< HEAD
=======
		.catch(next)
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
})


//=================================== SIGN UP ================================
<<<<<<< HEAD
// POST /sign-up
=======
// POST
// ROUTE ->  /sign-up
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
router.post('/sign-up', (req, res, next) => {

	Promise.resolve(req.body.credentials)
		.then((credentials) => {
<<<<<<< HEAD
			console.log(credentials)
=======
			console.log(req.body.credentials)
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
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
<<<<<<< HEAD
=======
			console.log(`=========== req.body.credentials.name=========`, req.body.credentials.name)
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
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
<<<<<<< HEAD
// POST /sign-in
=======
// POST 
// ROUTE -> /sign-in
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
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
<<<<<<< HEAD
// PATCH /change-password
=======
// PATCH 
// ROUTE -> /change-password
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
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
<<<<<<< HEAD
// DELETE /sign-out
=======
// DELETE 
// ROUTE -> /sign-out
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
router.delete('/sign-out', requireToken, (req, res, next) => {
	req.user.token = crypto.randomBytes(16)
	req.user
		.save()
		.then(() => res.sendStatus(204))
		.catch(next)
})

// ================================ UPDATE ================================
<<<<<<< HEAD
// PUT /update


router.patch('/update', requireToken, (req, res, next) => {
	// using userId to avoid using it directly in find to avoid '_.id' issues
	const userId = req.user.id
=======
// PUT
// ROUTE ->  /update/:userId

// router.get('/update/:userId', requireToken, (req,res)=> {
// 	const userId = req.params.userId
// 	User.findById(userId)
// 		.then(errors.handle404)
// 		.then(user=> {
// 			console.log(user)
// 			res.json({user:user})
// 		})
// })


router.patch('/update/:userId', requireToken, (req, res, next) => {
	// using userId to avoid using it directly in find to avoid '_.id' issues
	const userId = req.params.userId
	// const userId = req.user.id
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
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

<<<<<<< HEAD
=======
  // ================================ SHOW PROFILE ================================
//   router.get('/:userId', (req,res,next)=> {
// 	const user = req.params.userId
// 	User.findById(user)
// 		.then(errors.handle404)
// 		.then((user)=> {
// 			console.log(`--------THIS IS A SPECIFIC USER--------`, user)
// 			res.json({user: user})
// 		})
// })

router.get('/:userId', (req,res,next)=> {
	const user = req.params.userId
	User.findById(user)
		.then(errors.handle404)
		.then((user)=> {
			console.log(`--------THIS IS A SPECIFIC USER--------`, user)
			res.json({user: user})
		})
})

>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
  

module.exports = router
