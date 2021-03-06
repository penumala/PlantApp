const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const User = require('../models/users.js')
router.get('/new', (req, res) => {
  res.render('users/new.ejs',{ currentUser: req.session.currentUser })
})
router.post('/', (req, res) => {
  console.log("----posting new user----");
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(
    req.body.password, 
    bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
   // res.redirect('/')
    res.render('garden/index.ejs',{
    currentUser: req.session.currentUser,
    errormessage: 'User Created' 
 });
  })
})
module.exports = router