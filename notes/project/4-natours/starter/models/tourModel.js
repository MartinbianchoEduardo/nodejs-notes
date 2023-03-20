const mongoose = require('mongoose');

//mongoose db schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'no name was given'],
    unique: [true, 'this name is already being used']
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, 'no price was given']
  }
});

//mongoose db model (uppercase)
//.model(name of the model , schema)
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
