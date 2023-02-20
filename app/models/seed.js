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
        email: 'Emily@emily.com',
        hashedPassword: await hashPassword('oranges'),
        profilePicture: 'https://media.istockphoto.com/id/610259354/photo/young-woman-using-dslr-camera.jpg?s=612x612&w=0&k=20&c=gjAR4JiqA8lkGQzssSrXxo3yl-cwr5j7Hy47cy-10c4=',
        coverPicture: 'https://media.istockphoto.com/id/1362074710/vector/liquid-style-colorful-pastel-abstract-background-with-elements-vector.jpg?s=612x612&w=0&k=20&c=yVO5FI7mSRAW2Lg38bEiRm2mEJa8GFTTxkVIpbxEJmY=',
        name: 'Emily',
        description: 'Software Engineer',
        city: 'New York',
        active: true
      },
      {
        email: 'Eric@eric.com',
        hashedPassword: await hashPassword('oranges'),
        profilePicture: 'https://media.istockphoto.com/id/1311956570/photo/asian-chinese-male-with-physical-disability-on-wheelchair-photographing-in-china-town-sitting.jpg?s=612x612&w=0&k=20&c=oQ3DcsBtdU4DP8w0Bk5aOOTCTmk86a5M2nI6wSkvCZc=',
        coverPicture: 'https://media.istockphoto.com/id/1183062232/photo/new-york-city-skyline-with-clouds.jpg?s=612x612&w=0&k=20&c=0JV_iOlodJjCy8GC1h9ev2TH09fPtGU-n7yAoUi59Aw=',
        name: 'Eric Sheppard',
        description: 'Software Engineer',
        city: 'Brooklyn',
        active: false
      },
      {
        email: 'Jordan@jordan.com',
        hashedPassword: await hashPassword('oranges'),
        profilePicture: 'https://media.istockphoto.com/id/1306704388/photo/the-photographer.jpg?s=612x612&w=0&k=20&c=awoiSLOA22QtH_-4oC_sZphhExbANjc5t73JMM1NZ40=',
        coverPicture: 'https://media.istockphoto.com/id/1272917828/photo/trees-in-the-park-in-autumn-on-sunny-day.jpg?s=612x612&w=0&k=20&c=kTvaP_LdgOisnjzPM73pMVYkw_CyIVuKtc0Ux8hePAk=',
        name: 'Jordan',
        description: 'Software Engineer',
        city: 'Chicago',
        active: true
      },
      {
        email: 'Ales@alex.com',
        hashedPassword: await hashPassword('oranges'),
        profilePicture: 'https://media.istockphoto.com/id/1413248665/photo/young-male-tourist-taking-videos-and-photos-with-his-camera-on-white-salt-in-salt-lake.jpg?s=612x612&w=0&k=20&c=327xMKYZFNjWisy4c4S9V77K_fPH6vLBRRrYKvwZWFg=',
        coverPicture: 'https://media.istockphoto.com/id/1179997588/photo/you-dont-need-someone-else-to-buy-you-flowers.jpg?s=612x612&w=0&k=20&c=88jFYgg_VWU3Fv0hcYfH5GwhQ6PhLxNHIwx2dmAatq0=',
        name: 'Alex',
        description: 'Software Engineer',
        city: 'New York City',
        active: true
      },
      {
        email: 'Dev@dev.com',
        hashedPassword: await hashPassword('oranges'),
        profilePicture: 'https://media.istockphoto.com/id/1412535366/photo/latin-photographer-holding-professional-camera-on-the-beach-and-smiling-portrait.jpg?s=612x612&w=0&k=20&c=XHaQ2_BlcftDhTltxTLAkoHb1yxmJ-_HlYXHg0CpND4=',
        coverPicture: 'https://media.istockphoto.com/id/1361830382/vector/abstract-retro-grunge-colorful-simply-modern-liquid-background.jpg?s=612x612&w=0&k=20&c=GD8WpNjG807w0U6rBAwVp6N8GGx5jUUjYmMG_bhV42s=',
        name: 'Dev',
        description: 'Software Engineer',
        city: 'Chicago',
        active: true
      },
      {
        email: 'Bruces@bruce.com',
        hashedPassword: await hashPassword('oranges'),
        profilePicture: 'https://media.istockphoto.com/id/1360760623/vector/people-photographing-famous-man-wearing-sunglasses-vector-cartoon.jpg?s=612x612&w=0&k=20&c=Mma9gxesoZvI1YpjFDsLc-sR-zbCmiqRhItU0Yi70h0=',
        coverPicture: 'https://media.istockphoto.com/id/683349638/photo/man-photographer-and-summer-landscape-of-krabi-thailand.jpg?s=612x612&w=0&k=20&c=8zpsqcMc9dbqkRazRYGNxgb9N-gFbp_AF3ifeM5nat8=',
        name: 'Bruce',
        description: 'Software Engineer',
        city: 'Chicago',
        active: true
      },
      {
        email: 'Enoch@enoch.com',
        hashedPassword: await hashPassword('oranges'),
        profilePicture: 'https://media.istockphoto.com/id/1353987972/photo/photographer-in-news-editorial-office.jpg?s=612x612&w=0&k=20&c=-5Bzo3I34rpPip0xbHRmCRA6W8XbM8hHdXn49bUlg08=',
        coverPicture: 'https://media.istockphoto.com/id/1400076941/vector/vector-abstract-colorful-smooth-wave-lines-isolated-on-transparent-background-design-element.jpg?s=612x612&w=0&k=20&c=UeYnkfstkoKtxPX87oXFlLw2IALd6rettR-C-UiGahU=',
        name: 'Enoch',
        description: 'Software Engineer',
        city: 'New York',
        active: true
      },
      {
        email: 'Rita@rita.com',
        hashedPassword: await hashPassword('oranges'),
        profilePicture: 'https://media.istockphoto.com/id/1302647801/photo/young-female-food-photographer-setting-everything-up-for-shooting.jpg?s=612x612&w=0&k=20&c=ZB0Wx6wqzPixjmwhwa0NHuHew0_RZEnD-jEXTF73SVc=',
        coverPicture: 'https://media.istockphoto.com/id/95340984/vector/colorful-background-rainbow-illustration.jpg?s=612x612&w=0&k=20&c=WJOGdCcwz6-zWVyIK2mmH4PtVHX1S02NYHlCtJPm3LA=',
        name: 'Rita',
        description: 'Software Engineer',
        city: 'New York City',
        active: true
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
  

