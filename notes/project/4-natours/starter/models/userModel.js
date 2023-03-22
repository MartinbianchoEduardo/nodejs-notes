const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  }
});

//password encryption
//happens between the moment it receives the data and the moment it saves in db
userSchema.pre('save', async function(next) {
  //only encrypt the password if the password field is updated
  //if updating email or name we dont want to encrypt again

  //if the user's (this) password was not modified
  if (!this.isModified('password')) return next();

  //hash the current password in the document
  //the 2nd param is for the intensity of security (default 10)
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
