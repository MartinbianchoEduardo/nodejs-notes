const Tour = require('../models/tourModel');

// mongodb will do this now
// exports.checkId = (req, res, next, val) => {
//   if (Number(req.params.id) > tours.length || !Number(req.params.id)) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid id'
//     });
//   }
//   next();
// };

exports.checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price on the request'
    });
  }
  next();
};

//GET requests
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success'
    // results: tours.length, //just to know how many results
    // data: {
    //   tours: tours //--> the tours on the rght is tours from line 23 (json.parse)
    // }
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find(tour => tour.id === Number(req.params.id));
  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

//POST requests
exports.createTour = (req, res) => {
  //201 == created
  res.status(201).json({
    status: 'success'
    // data: {
    //   tour: newTour
    // }
  });
};

//PATCH
//put = expect we'll send the entire object to be updated
//patch = only expect the properties to be updated

//DELETE
exports.deleteTour = (req, res) => {
  //this doesn't delete anything, it's just for looks
  res.status(204).json({
    status: 'success',
    data: null
  });
};
