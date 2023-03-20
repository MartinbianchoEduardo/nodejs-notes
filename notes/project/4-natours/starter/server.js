const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose
  .connect(
    'mongodb+srv://dudu:n9ddVHYV9rlwELM9@cluster0.bxp3thr.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('connected');
  });

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

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
