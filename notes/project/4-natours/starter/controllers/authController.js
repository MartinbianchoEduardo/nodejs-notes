const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, 'supersecretkey', {
    expiresIn: '90d'
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    //.sign(payload , secret , options)
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token: token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if exist
    //since there is no error handling in this project, will not check

    //check if user exist and password is correct
    const user = await User.findOne({ email: email }).select('+password');
    //.select() is used because in userModel, the user is select: false
    //and is not returned in responses - so is needed to select manually here

    //check if password matches the db (this is done in the userModel cause it relates to the data itself)
    const correct = user.correctPassword(password, user.password);

    if (!user || !correct) {
      throw new Error('error - no user or the password is not correct');
    }

    //send jwt back to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
