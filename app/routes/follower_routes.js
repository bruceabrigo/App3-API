const express = require('express')
const passport = require('passport')
const FollowCart = require('../models/followCart')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const errors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// 1) we need 1 followerCart id -> per user
// 
const mongoose = require('mongoose')

/* ----------------------- Create and Push ----------------------- */

router.get('/follow', (req,res,next)=> {
	FollowCart.find({})
		.then(errors.handle404)
		.then((fcart)=> {
			console.log(`--------THESE ARE ALL THE CARTS--------`, fcart)
			res.json({fcart: fcart})
		})
})


router.get('/followers/:user/:anUserId', (req, res) => {
    const userid = req.params.user
    const anUserId = req.params.anUserId
    console.log(`========= USER ID =======`, userid)
    console.log(`========= Another USER ID =======`, anUserId)

    // Find an existing followCart
    FollowCart.findOne({ owner: userid })
        .then((fcart) => {
            if (fcart) {
                console.log(`======= FIRST CONSOLE=====`)
                console.log(`this is followCart`, fcart)
        
                fcart.followers.push(anUserId)
                // console.log(fcart.followers.push(anUserId))
                return fcart.save()

                
                // res.json(fcart)
            } else {
                FollowCart.create({
                    owner: userid,
                    followers: [],
                    followings: []
                }).then((fcart) => {
                    console.log(`======= SECOND CONSOLE=====`);
                    console.log(`this is followCart`, fcart)
                    fcart.followers.push(anUserId)
                    return fcart.save()
                    // res.json(fcart);
                });
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                // FollowCart not found
                FollowCart.create({
                    owner: userid,
                    followers: [],
                    followings: []
                }).then((fcart) => {
                    console.log(`======= THIRD CONSOLE=====`)
                    console.log(`this is followCart`, fcart)
                    fcart.followers.push(anUserId)
                    return fcart.save()
                    // res.json(fcart)
                });
            } else {
                // Other error
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
});



module.exports = router