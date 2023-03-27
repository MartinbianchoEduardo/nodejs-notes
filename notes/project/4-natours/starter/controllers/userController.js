const User = require('../models/userModel');
const AppError = require('../util/AppError');

//GET
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
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

//delete all users
exports.deleteAll = async (req, res) => {
  const users = await User.find();
  console.log(users);

  //delete all users in users array
  users.forEach(async user => {
    await User.findByIdAndDelete(user._id);
  });

  res.status(200).json({
    status: 'success',
    message: 'all users deleted'
  });
};
