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

//=============================== GET ALL ===================================
// ROUTES - /follow/

router.get('/', (req,res)=> {
	FollowCart.find({})
		.then(errors.handle404)
		.then((fcart)=> {
			console.log(`--------THESE ARE ALL THE CARTS--------`, fcart)
			res.json({fcart: fcart})
		})
})

//=============================== CREATE A FOLLOW CART ===================================
// ROUTES - /follow/owner/:ownerId

// router.post('/owner/:userId', (req,res)=> {
//     const userId = req.params.userId
//     FollowCart.create({
//         owner: userid,
//         followers: [],
//         followings: []
//     })
//         .then((fcart)=> {
//             res.status(201).json({fcart: fcart})
//         })
// })

//=============================== SHOW ONE FOLLOW ===================================
// ROUTES - /follow/owner/:ownerId

router.get('/owner/:userId', (req,res)=> {
    const userId = req.params.userId

	FollowCart.findOne({owner: userId})
        .then((fcart) => {
            if(fcart){
                console.log(`--------THESE ARE ALL THE CARTS--------`, fcart)
			res.json({fcart: fcart})
            } else {
                FollowCart.create({
                    owner: userId,
                    followers: [],
                    followings: []
                }).then((fcart) => {
                    console.log(`======= SECOND CONSOLE=====`);
                    console.log(`this is followCart`, fcart)
                    // res.json(fcart);
                })
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                // FollowCart not found
                FollowCart.create({
                    owner: userId,
                    followers: [],
                    followings: []
                }).then((fcart) => {
                    console.log(`======= THIRD CONSOLE=====`)
                    console.log(`this is followCart`, fcart)
                    // res.json(fcart)
                });
            } else {
                // Other error
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        })
		
})

//=============================== ADDING FOLLOWERS ===================================
// ROUTES - /follow/:user/:anUserId

router.get('/followers/:user/:anUserId', (req, res) => {
    const userid = req.params.user
    const anUserId = req.params.anUserId
    console.log(`========= USER ID =======`, userid)
    console.log(`========= Another USER ID =======`, anUserId)

    // Find an existing followCart
    FollowCart.findOne({ owner: userid })
        .populate('owner', 'followings', 'followers')
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

//===============================  FOLLOWING OTHERS ===================================
// ROUTES -> /follow/:user/:anUserId

router.get('/:user/:anUserId', (req, res) => {
    const userid = req.params.user
    const anUserId = req.params.anUserId
    console.log(`========= USER ID =======`, userid)
    console.log(`========= Another USER ID =======`, anUserId)

    // Find an existing followCart
    FollowCart.findOne({ owner: userid })
        .populate('owner')
        .populate('followers', '_id.name')
        .populate('followings')
        .then((fcart) => {
            if (fcart) {
                console.log(`======= FIRST CONSOLE=====`)
                console.log(`this is followCart`, fcart)
        
                fcart.followings.push(anUserId)
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
                    fcart.followings.push(anUserId)
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
                    fcart.followings.push(anUserId)
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


// router.get('/:user/:anUserId', (req, res, next) => {
//         const userid = req.params.user
//         const anUserId = req.params.anUserId
//         console.log(`========= USER ID =======`, userid)
//         console.log(`========= Another USER ID =======`, anUserId)
    
//         // Find an existing followCart
//         FollowCart.findOne({ owner: userid })
//             .then((fcart) => {
//                 if (fcart) {
//                     console.log(`======= FIRST CONSOLE=====`)
//                     console.log(`this is followCart`, fcart)
            
//                     fcart.followings.push(anUserId)
//                     // console.log(fcart.followers.push(anUserId))
//                     return fcart.save()

//                     // FIND ANOTHER F CART
//                     .then(()=> {
//                         FollowCart.findOne({owner: anUserId})
//                             .then(fcart=> {
//                                 console.log(`USERS FCART`, fcart)
//                                 fcart.followers.push(userid)
//                                 return fcart.save()
//                             })
//                     })
//                     .catch(next)
    
                    
//                     // res.json(fcart)
//                 } else {
//                     FollowCart.create({
//                         owner: userid,
//                         followers: [],
//                         followings: []
//                     }).then((fcart) => {
//                         console.log(`======= SECOND CONSOLE=====`);
//                         console.log(`this is followCart`, fcart)
//                         fcart.followings.push(anUserId)
//                         return fcart.save()
//                         // res.json(fcart);
//                     })
//                     .then(()=> {
//                         FollowCart.findOne({owner: anUserId})
//                             .then(fcart=> {
//                                 console.log(`USERS FCART`, fcart)
//                                 fcart.followers.push(userid)
//                                 return fcart.save()
//                             })
//                     })
//                 }
//             })
//             .catch((err) => {
//                 if (err.name === 'CastError') {
//                     // FollowCart not found
//                     FollowCart.create({
//                         owner: userid,
//                         followers: [],
//                         followings: []
//                     }).then((fcart) => {
//                         console.log(`======= THIRD CONSOLE=====`)
//                         console.log(`this is followCart`, fcart)
//                         fcart.followings.push(anUserId)
//                         return fcart.save()
//                         // res.json(fcart)
//                     })
//                     .then(()=> {
//                         FollowCart.findOne({owner: anUserId})
//                             .then(fcart=> {
//                                 console.log(`USERS FCART`, fcart)
//                                 fcart.followers.push(userid)
//                                 return fcart.save()
//                             })
//                     })
//                 } else {
//                     // Other error
//                     console.error(err);
//                     res.status(500).json({ message: 'Internal server error' });
//                 }
//             });
//     });

// router.get('/:user/:anUserId', async (req, res, next) => {
//     const userid = req.params.user
//     const anUserId = req.params.anUserId
//     console.log(`========= USER ID =======`, userid)
//     console.log(`========= Another USER ID =======`, anUserId)
  
//     try {
//       let fcart = await FollowCart.findOne({ owner: userid })
//       if (!fcart) {
//         fcart = await FollowCart.create({
//           owner: userid,
//           followers: [],
//           followings: []
//         })
//         console.log(`======= SECOND CONSOLE=====`);
//         console.log(`this is followCart`, fcart)
//       }
//       fcart.followings.push(anUserId)
//       await fcart.save()
//       console.log(`======= FIRST CONSOLE=====`)
//       console.log(`this is followCart`, fcart)
  
//       let anFcart = await FollowCart.findOne({ owner: anUserId })
//       if (!anFcart) {
//         anFcart = await FollowCart.create({
//           owner: anUserId,
//           followers: [],
//           followings: []
//         })
//         console.log(`======= THIRD CONSOLE=====`)
//         console.log(`this is followCart`, anFcart)
//       }
//       anFcart.followers.push(userid)
//       await anFcart.save()
//       console.log(`USERS FCART`, anFcart)
  
//       res.json({ message: 'Successfully followed' })
//     } catch (err) {
//       if (err.name === 'CastError') {
//         console.log(`======= FOURTH CONSOLE=====`)
//         console.log(`FollowCart not found, creating a new one`)
//         const fcart = await FollowCart.create({
//           owner: userid,
//           followers: [],
//           followings: []
//         })
//         fcart.followings.push(anUserId)
//         await fcart.save()
  
//         let anFcart = await FollowCart.findOne({ owner: anUserId })
//         if (!anFcart) {
//           anFcart = await FollowCart.create({
//             owner: anUserId,
//             followers: [],
//             followings: []
//           })
//           console.log(`======= FIFTH CONSOLE=====`)
//           console.log(`this is followCart`, anFcart)
//         }
//         anFcart.followers.push(userid)
//         await anFcart.save()
//         console.log(`USERS FCART`, anFcart)
  
//         res.json({ message: 'Successfully followed' })
//       } else {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//       }
//     }
//   })
  
module.exports = router