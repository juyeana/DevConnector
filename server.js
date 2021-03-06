const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyparser = require('body-parser');
const passport = require('passport');

//create an instance of the express
//this statement brings everything from express library
const app = express();

//Body parser configuration
//Whenever you get data, convert the data into JSON format using bodyparser
//use body-parser and make sure url is encoded in a normal way
//define body-parser here only once to use it anywhere in the app. If you don't define it here, you will need to define it every time you need.
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//First route
//when a user visit a link, what do you want to execute?
app.get('/', (req, res) => res.send('Hi there'));

//if you see this specific uri, take me to the corresponding javascript
//only javascripts that defined here will be exectuted
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 7100;
//app.func(a, functionB)  - if a gets exectuted successfully then execute functionB
app.listen(port, () => console.log(`Server running on port ${port}...`));

//DB config

const db = require('./config/keys').mongoURI;

//connect mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

//passport configuration

//initialize passport and ask app to use it
app.use(passport.initialize());

//calling the passport function from passport.js and execute it here
//at this point, there is no token to execute but initialize it and gets ready to receive a token when it's available.
require('./config/passport')(passport);
