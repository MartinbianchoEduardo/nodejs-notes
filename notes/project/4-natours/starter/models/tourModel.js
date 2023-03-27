const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [500, 'A tour name must have less or equal then 40 characters'],
    minlength: [1, 'A tour name must have more or equal then 10 characters']
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult'
    }
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

//MONGODB INDEXES

// mongodDB by default will make a collection search of all documents after
// each query, in order to find the wanted data
// this is extremely bad for perfomance
// to solve this, we use indexes
// indexes are other smaller lists made from a document field

// for instance:
// if I believe that a query for all the 4.5 > rating tours will be made a lot
// I can create an index for all the 4.5 > rating documents
// this index will contain a list refering only to the documents that match this criteria

// by default, mongoDB already does this for ids
// so when you search anything by ID, it only looks at the list of ids it has from the index

// note: this lists are always ordered and the sorting can be changed
