//this file (app.js) is only used for things related to express

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const fs = require('fs');
const express = require('express');

const app = express();

//MIDDLEWARES (in express)
//app.use(function)
//the position of the middleware in relation to the routing is crucial
//when you return a json response (res.status().json()),
//the request/response cycle ends and all middleware called after this, will not be called

app.use(express.json());

//the third param here is the next function that will be called
app.use((req, res, next) => {
  //add the current time to the request body
  req.requestTime = new Date().toISOString();
  //NEVER forget to use next()
  //otherwise the middleware will be stuck
  next();
});

//ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
