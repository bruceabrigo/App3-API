// 1) We need 1 followCart id -> per user
    // (i) Check if the user has a followCart 
        // (a) Yes -> Push user ids
        // (b)  No -> Then create a followCart and push 
// (2) Make the userId to be unique so that one user cannot follow or get followed multiple times  


const express = require('express')
const passport = require('passport')
const FollowCart = require('../models/followCart')
const requireToken = passport.authenticate('bearer', { session: false })

/////// ERROR HANDLERS ///////////////////
const errors = require('../../lib/custom_errors')
const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

///////// ROUTER //////////////////////////
const router = express.Router()

//=============================== CREATE & PUSH ===================================

router.get('/followers', (req,res,next)=> {
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
                console.log(fcart.followers.push(anUserId))
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