const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//create an instance of the express
//this statement brings everything from express library
const app = express();

//First route
//when a user visit a link, what do you want to execute?
app.get('/', (req, res) => res.send('Hello'));

//if you see this specific uri, take me to the javascript
//only javascripts that defined here will be exectuted
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 7000;
//app.func(a, functionB)  - if a gets exectuted successfully then execute functionB
app.listen(port, () => console.log(`Server running on port ${port}...`));

//DB config

const db = require('./config/keys').mongoURI;

//connect mongodb
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
