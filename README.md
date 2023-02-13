# SOCIAL MEDIA APP
<<<<<<< HEAD


# User Story
Welcome to the GenZ era of Social Media. 
Our Social media app facilitates users to do the following on our website:->

- `Sign-Up`
- `Log-In`
- `Log-Out`
- `Show Online or Offline`

- `Create Post/Content`
- `Update/Delete Content`
- `Follow`
- `Unfollow`

BONUS

- `Comments on Profile Picture`
- `Chat-Bot`

# Technologies Used

1. HTML5
2. CSS
3. Java Script
4. Node and it's packages
5. Mongoose/MongoDB
6. Express
7. React

# Wireframes

Bruce & Enoch

1) Website Landing Screen
2) Home Screen

# Models - ERD

1. User Schema

```.js
=======
BRE-Crypt

# User Story
Welcome to the GenZ era of Social Media. 
Our Social media app facilitates users to do the following on our website:->

- Sign-Up
- Log-In
- Log-Out
- Show Online or Offline

- Create Post/Content
- Update/Delete Content
- Follow
- Unfollow

BONUS

- Comments on Profile Picture
- Chat-Bot

# Technologies Used

1. HTML5
2. CSS
3. Java Script
4. Node and it's packages
5. Mongoose/MongoDB
6. Express
7. React

# Wireframes

1) Website Landing Screen
![Alt text](img/Screen_Shot_2023-02-11_at_2.54.48_PM.png)
![Alt text](img/Screen_Shot_2023-02-11_at_3.09.14_PM.png)

2) Home Screen
![Alt text](img/BRE-Crypt.jpg)
![Alt text](img/BRE-Crypt2.jpg)
![Alt text](img/BRE-Crypt3.jpg)

# Models - ERD

1. User Schema

```.js

>>>>>>> 596a8a9a07869d08cd39c736876cc1db5f4abf3e
const userSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
      data: Buffer
    },
    coverPicture: {
        type: String,
        data: Buffer
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
        username: { 
      type: String, 
      required: true, 
      unique: true 
    },
        email: {
      type: String, 
      required: true 
    },
    password: {
        type: String
    },
    description: {
        type: String
    },
    city: {
        type: String
    },
    active: {
        type: Boolean
    }

  }, {
      timestamps: true,
      toObject: { virtuals: true },
      toJSON: { virtuals: true }
  }
)
```

<<<<<<< HEAD
2. Content Schema

```.js

=======

2. Content Schema

```.js

>>>>>>> 596a8a9a07869d08cd39c736876cc1db5f4abf3e
const contentSchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, 
    img: {
      type: String,
      data: Buffer,
    }, 
    material: {
      type: String
    },
    likes: {
      type: Array,
      default: []
    }

  }, {timestamps: true}
)
<<<<<<< HEAD
=======

>>>>>>> 596a8a9a07869d08cd39c736876cc1db5f4abf3e
```