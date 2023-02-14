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

router.get('/followers', (req,res)=> {
    res.send('Hello Follow Routes')
})


router.get('/followers/:user', (req, res) => {
    const userid = req.params.user;
    console.log(`========= USER ID =======`, userid);
    // Find an existing followCart
    FollowCart.findOne({ owner: userid })
        .then((fcart) => {
            if (fcart) {
                console.log(`======= FIRST CONSOLE=====`);
                console.log(`this is followCart`, fcart);
                res.json(fcart);
            } else {
                FollowCart.create({
                    owner: userid,
                    followers: [],
                    followings: []
                }).then((fcart) => {
                    console.log(`======= SECOND CONSOLE=====`);
                    console.log(`this is followCart`, fcart);
                    res.json(fcart);
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
                    console.log(`======= SECOND CONSOLE=====`);
                    console.log(`this is followCart`, fcart);
                    res.json(fcart);
                });
            } else {
                // Other error
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
});



module.exports = router