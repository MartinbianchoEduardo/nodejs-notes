const fs = require('fs');
const User = require('../models/userModel');

//GET
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(400).json({
      status: 'success',
      data: {
        users: users
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'unable to get users'
    });
  }
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this request is not yet defined'
  });
};

//POST
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this request is not yet defined'
  });
};

//DELETE
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this request is not yet defined'
  });
};
