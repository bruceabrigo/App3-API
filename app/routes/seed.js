const mongoose = require('mongoose')
const db = require('../../config/db')
const bcrypt = require('bcrypt')
const User = require('./user')


// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

// Array of users to seed
const seed = async () => {
    const users = [
      {
        email: 'user1@example.com',
        hashedPassword: await hashPassword('password123'),
        profilePicture: 'https://pps.whatsapp.net/v/t61.24694-24/312243894_1132757520717442_2053258742807540518_n.jpg?ccb=11-4&oh=01_AdQM4lffCTmSP7A5M1TMpj3chRd9cCWwhezz4yz5aocB2g&oe=63F97AA0',
        coverPicture: 'https://www.seekpng.com/png/detail/56-567700_illustration-of-nyc-new-york-city.png',
        name: 'User One',
        description: 'This is User One',
        city: 'New York',
        active: true
      },
      {
        email: 'user2@example.com',
        hashedPassword: await hashPassword('password456'),
        name: 'User Two',
        description: 'This is User Two',
        city: 'San Francisco',
        active: false
      },
      {
        email: 'user3@example.com',
        hashedPassword: await hashPassword('password789'),
        name: 'User Three',
        description: 'This is User Three',
        city: 'Chicago',
        active: true
      },
      {
        email: 'user4@example.com',
        hashedPassword: await hashPassword('passwordabc'),
        name: 'User Four',
        description: 'This is User Four',
        city: 'Miami',
        active: false
      }
    ];
    
    return users; // add this line to return the array of users
  }
  

// Seed users


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    User.deleteMany().then(deletedUsers => {
      console.log('the deleted users:', deletedUsers);
      // call seed() and pass the result to User.create()
      seed().then(users => {
        User.create(users).then(newUsers => {
          console.log('the new users', newUsers)
          mongoose.connection.close()
        }).catch(error => {
          console.log(error)
          mongoose.connection.close()
        })
      }).catch(error => {
        console.log(error)
        mongoose.connection.close()
      })
    }).catch(error => {
      console.log(error)
      mongoose.connection.close()
    })
  }).catch(error => {
    console.log(error)
    mongoose.connection.close()
  })
  