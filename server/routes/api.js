const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const db = "mongodb://localhost/userRegistration"


mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Comedy",
      "description": "It is happening in Banglore!If you are comedy Lover then join us.",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Music",
      "description": "Everybody likes to listen music, here we organise the music event in your city! Enjoy guys.",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Games",
      "description": "It is in your city. Come and join us, Live your Bachpan!",
      "date": "2012-04-23T18:25:43.511Z"
    }
  
 
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Food Special",
      "description": "This is the food fare!!",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Dance",
      "description": "Get chance for dance!!",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Music",
      "description": "Love Lyrics",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Poetry special",
      "description": "No Description",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Party special",
      "description": "No words",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Book-Reading special",
      "description": "Love story, come ...",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})
router.get('/contact', verifyToken, (req, res) => {
  let contacts = [
    {
      "_id": "1",
      "email": "admin@eventhub.in",
      "Address": "#47 Hebbal, Banglore 560092 - India",
      "Mobile" : "(+91)7007331687"
    },
    {
    "_id": "1",
      "email": "admin@eventhub.in",
      "Address": "#47 Andheri East, Pune 560092 - India",
      "Mobile" : "(+91)7007331687"
    }
  ]
      
  res.json(contacts)
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

module.exports = router;