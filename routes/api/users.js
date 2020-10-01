const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport'); //just import passport library itself as passport.js configures what it needs to do.
const gravatar = require('gravatar');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// I want only Router from the express nothing else.
const router = express.Router();

// @route POST /api/users/register
// @desc Register user
// @access Public

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
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
        comment: req.body.comment,
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

// @route POST /api/users/login
// @desc Login user
// @access Public

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({ email: 'user not found' });

      //check the password

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            //User matched and create a token
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };
            //sign token
            //majority companies in industry use 'Bearer' type of token, with which users are reponsible for any actions they make. But you need to add 'Bearer' before an issued token
            jwt.sign(
              payload,
              keys.secretKey,
              { expiresIn: 3600 },
              (err, token) => {
                return res.json({ token: `Bearer ` + token });
              }
            );
          } else {
            return res.status(400).json({ password: 'Invalid password' });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//'current' route is for testing passport in the server side before we build UI.
// @route GET /api/users/current
// @desc Return the current user
// @access Private

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.json(req.user);
  }
);
module.exports = router;
