//this file (app.js) is only used for things related to express

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

//MIDDLEWARES (in express)
//app.use(function)
//the position of the middleware in relation to the routing is crucial
//when you return a json response (res.status().json()),
//the request/response cycle ends and all middleware called after this, will not be called

app.use(express.json());

//the third param here is the next middleware that will be called
app.use((req, res, next) => {
  //add the current time to the request body
  req.requestTime = new Date().toISOString();
  //NEVER forget to use next()
  //otherwise the middleware will be stuck
  next();
});

//ROUTES
//rendering pages in browser (always use .get)
app.get('/', (req, res) => {
  //instead of .json, use .render( name of view.pug )
  res.status(200).render('base');
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

module.exports = app;
