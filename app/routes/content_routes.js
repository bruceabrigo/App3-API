<<<<<<< HEAD
// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Example = require('../models/example')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/examples', requireToken, (req, res, next) => {
	Example.find()
		.then((examples) => {
			// `examples` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return examples.map((example) => example.toObject())
		})
		// respond with status 200 and JSON of the examples
		.then((examples) => res.status(200).json({ examples: examples }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/examples/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Example.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "example" JSON
		.then((example) => res.status(200).json({ example: example.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /examples
router.post('/examples', requireToken, (req, res, next) => {
	// set owner of new example to be current user
	req.body.example.owner = req.user.id

	Example.create(req.body.example)
		// respond to succesful `create` with status 201 and JSON of new "example"
		.then((example) => {
			res.status(201).json({ example: example.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/examples/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.example.owner

	Example.findById(req.params.id)
		.then(handle404)
		.then((example) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, example)

			// pass the result of Mongoose's `.update` to the next `.then`
			return example.updateOne(req.body.example)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/examples/:id', requireToken, (req, res, next) => {
	Example.findById(req.params.id)
		.then(handle404)
		.then((example) => {
			// throw an error if current user doesn't own `example`
			requireOwnership(req, example)
			// delete the example ONLY IF the above didn't throw
			example.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
=======
const express = require('express')
const passport = require('passport')
const Content = require('../models/content')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const errors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const mongoose = require('mongoose')



// ---------------- GET INDEX ----------------
// ROUTES -> /content/
router.get('/', (req, res, next) => {
    Content.find({})
        .populate('owner', 'likes')
        .then((contents) => {
            res.json({contents})
        })
        .catch(next)

})

// ---------------- PUSH USERS IN ARRAY ----------------
// ROUTES -> /content/likes/:userId/:conId

router.get('/likes/:userId/:conId', (req,res,next)=> {
    // Need user id and content Id
    user = req.params.userId
    con = req.params.conId
    console.log(`This is userId`, user)
    console.log(`This is contentId`, con)

    Content.findOne({ _id: con })
        .populate('owner', 'likes')
        .then((content) => {
            content.likes.push(user)
            return content.save()
        })
        .then((content) => {
            console.log(content)
            res.status(201)
        })
        .catch(next)
})

// ---------------- DELETE ----------------
// ROUTES -> /content/delete/:contentId

router.delete('/delete/:contentId', (req, res, next) => {
    // Need userId to match the owner of the content
    const contentId = req.params.contentId;
    Content.deleteOne({ _id: contentId })
      .then((content) => {
        console.log(content)
        res.status(200).json({ message: 'Content deleted successfully' });
      })
      .catch(next);
  });
  

// ---------------- CREATE ----------------
// ROUTES -> /content/:user
router.post('/:user', (req, res, next) => {
    user = req.params.userId
    req.body.content.owner = req.userId
    console.log('content owner: ', req.body)
    console.log('user in post: ', user)
    Content.create(req.body.content)
        .then((content) => {
            res.status(201).json({content: content.toObject()})
        })
        .catch(next)

})

// ---------------- SHOW One Content  ----------------
// ROUTES -> /content/:user
router.get('/:user', (req, res, next) => {
    user = req.params.user
    Content.findById(user)
        // .populate('owner', 'likes')
        // .then((content) => {
        //     res.json({content: content})
        // })
        .then((content) => res.status(200).json({content:content}))
        .catch(next)
})

// ---------------- UPDATE ----------------
// ROUTES -> /content/:contentId

router.patch('/:contentId', requireToke, removeBlanks, (req, res, next) => {
    delete req.body.content.owner

    Content.findById(req.params.id)
        .then(handle404)
        .then((content))
  })
  


module.exports = router
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
