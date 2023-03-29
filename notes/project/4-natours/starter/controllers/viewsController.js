const Tour = require('../models/tourModel');

exports.getOverview = async (req, res) => {
  //get tour data from collection
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
};

exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  res.status(200).render('tour', {
    title: 'forest tiger',
    tour
  });
};
