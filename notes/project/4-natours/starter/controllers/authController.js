const { promisify } = require('util');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../util/AppError');

const signToken = id => {
  //.sign(payload , secret , options)
  return jwt.sign({ id }, process.env.JWT_SECRET, {
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
    //check if exists
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    //check if user exist and password is correct
    const user = await User.findOne({ email: email }).select('+password');
    //.select() is used because in userModel, the user is select: false
    //and is not returned in responses - so is needed to select manually here

    //check if password matches the db (this is done in the userModel cause it relates to the data itself)
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
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

exports.protect = async (req, res, next) => {
  //get token and check if it exists
  let token;
  //if there's no authorization headers, dont't even start
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('you are not logged in, log in to get access', 401)
    );
  }

  //validate token (see if the data was manipulated or the token has expired)\\
  //have to promisify since verify is an async function
  //promisify makes the function return the promise
  const decodedData = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
    //promisify(jwt.verify) - all this is a function, called with the (token, jwt_secret) params
  ); //verify the token with our secret key

  //check if user still exists\\
  const validateUser = await User.findById(decodedData.id); //id of the user issuing the token
  if (!validateUser) {
    next(new AppError('not authorized'));
  }

  //in case everything is correct, the code reaches this point
  // req.user = validateUser
  next();
};
