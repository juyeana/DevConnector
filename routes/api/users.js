const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

// I want only Router from the express nothing else.
const router = express.Router();

// @route GET /api/users/test
// @desc Tests user js
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'User works' }));

// @route POST /api/users/register
// @desc Register user
// @access Public

router.post('/register', (req, res) => {
  //email : the name of the schema
  //req.body.email : the value that user submits
  //request to find a user's email address if that matches with one the user enters => checking if the same email address exist in the database
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exist' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'g',
        d: 'mm', //default value of your image quality
      });
      //build a new model to convert JSON data to a suitable model in the database
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      //genSalt: generate salt
      //you can either use promise then or a callback function
      //bcrypt.genSalt(10).then().catch()
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
module.exports = router;
