const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();

//this middleware will only be used if the route has an 'id' param
//val == value of parameter in question (id)
router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .delete(tourController.deleteTour);

module.exports = router;
