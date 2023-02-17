<<<<<<< HEAD
<<<<<<< HEAD
# SOCIAL MEDIA APP
BRE-Crypt
By; Rita, Enoch, and Bruce
=======
 
# SOCIAL MEDIA APP
=======
 
# SOCIAL MEDIA APP
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081

## DEVELOPER DETAILS
- This is a Social Media Application
-  CREATED BY BRE-Crypt ===> Rita, Enoch, and Bruce
<<<<<<< HEAD
>>>>>>> ad1f0e8bdf93bbeaf6ccf93610e08e341b3a5502
=======
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081

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


<<<<<<< HEAD
<<<<<<< HEAD
1) Website Landing Screen
Login
  - Initial landing page will prompt a retuning user to Log-In or Sign Up
![Alt text](img/Screen_Shot_2023-02-11_at_2.54.48_PM.png)
Sign Up
  - If a user is new to the platform, they have the ability to log in.
![Alt text](img/Screen_Shot_2023-02-11_at_3.09.14_PM.png)

2) Home Screen
Main Page of Social Media App
  - User can see posts and make searches
![Alt text](img/BRE-Crypt.jpg)
User Page: 
  - Upload profile images, password, and nicknames
![Alt text](img/BRE-Crypt2.jpg)
Direct Message Feature
![Alt text](img/BRE-Crypt3.jpg)

# Models - ERD
=======

# ENTITY RELATIONSHIP CHART
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081

=======

# ENTITY RELATIONSHIP CHART

![Alt text](img/App3-API.jpeg)

# ROUTES

### User Routes
| **URL**            | **HTTP Verb**|**Action**     |
|--------------------|--------------|---------------|
<<<<<<< HEAD
| /             | GET          | All Users          |
| /sign-up      | GET          | new                |
| /sign-up      | POST         | create             |
| /sign-in      | GET          | login              |
| /sign-in      | POST         | create             |
| /sign-out     | DELETE       | destroy            |
| /update       | UPDATE       | Update info        |
=======
| /                  | GET          | all Users     |
| /sign-up           | GET          | new           |
| /sign-up           | POST         | create        |
| /sign-in           | GET          | login         |
| /sign-in           | POST         | create        |
| /sign-out          | DELETE       | destroy       |
| /update            | UPDATE       | Update info   |


### FollowCart Routes
| **URL**                        | **HTTP Verb**|**Action**       |
|--------------------------------|--------------|-----------------|
| /follow                        | GET          | all followCarts |
| /followers/:user/:anUserId     | GET/CREATE   | add Followers   |
| /:user/:anUserId               | GET/CREATE   | follow Others   |


### Content Routes
| **URL**                        | **HTTP Verb**|**Action**               |
|--------------------------------|--------------|-------------------------|
| /content/:user                 | POST         | create                  | 
| /content/                      | GET          | all Content             |
| /content/:user                 | GET          | specific User's Content |
| /content/likes/:userId/:conId  | GET/CREATE   | add likes to content    |
| /content/:contentId            | UPDATE       | update content          |
| /content/delete/:contentId     | DELETE       | remove content          |





>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081



# Models 
<<<<<<< HEAD
>>>>>>> ad1f0e8bdf93bbeaf6ccf93610e08e341b3a5502
=======
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
1. User Schema

```.js
const userSchema = new mongoose.Schema(
<<<<<<< HEAD
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
=======
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,
		profilePicture: {
			type: String,
			data: Buffer
		},
		coverPicture: {
			type: String,
			data: Buffer
		},
		name: {
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
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081

	},
	{
		timestamps: true,
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
)
```

2. FollowCart Schema
```.js
const followCartSchema = new mongoose.Schema(
{
  followers: [
    {type: Schema.Types.ObjectId,
    ref: 'User'} 
  ],
  followings: [
    {type: Schema.Types.ObjectId,
    ref: 'User'} 
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}
```


2. Content Schema

```.js

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

```.js
=======
```

<<<<<<< HEAD

>>>>>>> ad1f0e8bdf93bbeaf6ccf93610e08e341b3a5502
=======
>>>>>>> bab7f29da3d915837d42f4e46a71b2f8b9ff4081
