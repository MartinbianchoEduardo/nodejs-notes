const mongoose = require('mongoose');

//mongoose db schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  rating: Number,
  price: {
    type: Number,
    required: true
  }
});

//mongoose db model (uppercase)
//.model(name of the model , schema)
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
