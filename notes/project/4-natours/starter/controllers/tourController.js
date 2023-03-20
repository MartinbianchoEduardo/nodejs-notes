const Tour = require('../models/tourModel');

// commented because mongodb does this for us now
// exports.checkId = (req, res, next, val) => {
//   if (Number(req.params.id) > tours.length || !Number(req.params.id)) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid id'
//     });
//   }
//   next();
// };

//GET requests
exports.getAllTours = async (req, res) => {
  //exclude fields from query filter
  const queryObject = { ...req.query }; //this '{...}' is made so we get a hard copy
  //because if we simply do 'queryObj = req.query' we will make a pointer
  //wich will alter the properties of req.query, which is bad
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObject[el]);
  console.log(req.query, queryObject);

  //.find() = query for all the documents in the collection
  const tours = await Tour.find(queryObject);
  //req.query is an object representing the query (e.g. /tour?difficulty=medium)
  //if the url has a query, it will be passed to the find() function
  //if not, will find all

  res.status(200).json({
    status: 'success',
    results: tours.length, //just to know how many results
    data: {
      tours: tours //--> the tours on the rght is tours from line 23 (json.parse)
    }
  });
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
