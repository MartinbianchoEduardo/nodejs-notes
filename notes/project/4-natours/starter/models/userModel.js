const mongoose = require('mongoose');

//this project doesn't contain validators
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'an user must have a name']
  },
  email: {
    type: String,
    require: [true, 'an user must have an email'],
    unique: true,
    lowerCase: true
  },
  photo: String,
  password: {
    type: String,
    require: [true, 'an user must have a password'],
    minLength: 5
  },
  passwordConfirm: {
    type: String,
    require: [true, 'please, confirm the password']
  }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
