//this file (app.js) is only used for things related to express

const path = require('path');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

//define that static assets will come from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

//MIDDLEWARES (in express)
//app.use(function)
//the position of the middleware in relation to the routing is crucial
//when you return a json response (res.status().json()),
//the request/response cycle ends and all middleware called after this, will not be called

app.use(cookieParser());

app.use(express.json());

//test middleware
//the third param here is the next middleware that will be called
app.use((req, res, next) => {
  //add the current time to the request body
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);

  //NEVER forget to use next()
  //otherwise the middleware will be stuck
  next();
});

//ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

module.exports = app;
