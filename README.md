 
# SOCIAL MEDIA APP

## DEVELOPER DETAILS
## DEVELOPER DETAILS
- This is a Social Media Application
-  CREATED BY BRE-Crypt ===> Rita, Enoch, and Bruce
-  CREATED BY BRE-Crypt ===> Rita, Enoch, and Bruce

# User Story
Welcome to the GenZ era of Social Media. 
Our Social media app facilitates users to do the following on our website:-

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



# ENTITY RELATIONSHIP CHART

![Alt text](img/App3-API.jpeg)
1. User Schema

```.js
const userSchema = new mongoose.Schema(
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
    likes: [
      {type: Schema.Types.ObjectId,
      ref: 'User'} 
    ],

  }, {
      timestamps: true,
      toObject: { virtuals: true },
      toJSON: { virtuals: true }
  }
)

```

3. Comment Schema

```.js
const commentSchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    usercomment: {
        type: String,
        required: true
    }
  }
)
```

