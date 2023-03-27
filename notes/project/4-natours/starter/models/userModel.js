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
    minLength: 1,
    select: false //never shows in response
  },
  passwordChangedAt: Date
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

//instance method - available in all documents on certain collection
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  //since the password has select:false, we have to pass the userPassword as a param
  //if !select:false we only would need to pass candidatePassword
  //and this.password would be == userPassword

  return await bcrypt.compare(candidatePassword, userPassword);
};

// userSchema.methods.hasChangedPassword = function(jwtTimeStamp) {
//   if (this.passwordChangedAt) {
//     console.log(this.passwordChangedAt, jwtTimeStamp);
//   }
//   return false;
// };

const User = new mongoose.model('User', userSchema);

module.exports = User;
