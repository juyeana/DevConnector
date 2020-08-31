const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//Create schema 

const UserSchema = new Schema({
  name: {
    type:String, 
    required: true,
  },
  email:{
    type:String,
    required: true,
  },
  password:{
    type:String,
    required: true,
  },
  avatar: {
    type:String,
  },
  data: {
    type:Date,
    default:Date.now,
  },
});

//tell mongoose to take the schema and make a collection for me.
//User = users
//User : internal name
//users : name that the database use outside
module.exports = User = mongoose.model('users', UserSchema)