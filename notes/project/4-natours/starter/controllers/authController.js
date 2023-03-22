const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    //.sign(payload , secret , options)
    const token = jwt.sign({ id: newUser._id }, 'supersecretkey', {
      expiresIn: '90d'
    });

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
