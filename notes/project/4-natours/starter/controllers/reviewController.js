const Review = require('../models/reviewModel');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newReview
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
