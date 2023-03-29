const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: { type: String, required: [true, 'a review cannot be empty'] },
  rating: {
    type: Number,
    require: [true, 'a rating is required'],
    min: 1,
    max: 5
    //min and max only work for numbers in mongoose
  },
  createdAt: { type: Date, default: Date.now },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'the review must belong to a tour']
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'the review must belong to an author']
  }
});

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    //path = the name of the field to be referenced
    path: 'tour',
    select: 'name'
  }).populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
