const Tour = require('../models/tourModel');
const APIfeatures = require('./../util/APIfeatures');
const AppError = require('../util/AppError');

//GET requests
exports.getAllTours = async (req, res) => {
  try {
    //execute query
    const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .paginate();
    //manipulate the query using these methods
    //then await the query response
    const tours = await features.query;
    //this is made to ease the implementation of future functions
    //such as sort, limit, pagination...

    res.status(200).json({
      status: 'success',
      results: tours.length, //just to know how many results
      data: {
        tours: tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  //req.params.id is router.route('/:id') in tourRoutes.js
  //if it was '/:name' instead of '/:id', the variable would be 'name' (req.params.name)

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

//POST requests
exports.createTour = async (req, res) => {
  try {
    //create method right in the model itself
    const newTour = await Tour.create(req.body);

    //201 == created
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

//PATCH
//put = expect we'll send the entire object to be updated
//patch = only expect the properties to be updated
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //this will make that the new document will be returned
      runsValidators: true //will run the validators specified in the schema to check the updated properties
    });
    res.status(200).json({
      status: 'success',
      tour: updatedTour
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

//DELETE
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndRemove(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
