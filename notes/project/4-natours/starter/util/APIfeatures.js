class APIfeatures {
  constructor(query, queryString) {
    this.query = query; //this is the requested information (I guess)
    this.queryString = queryString; //this is the string passed in the query
  }

  filter() {
    //build query
    //exclude fields from query filter
    const queryObject = { ...this.queryString }; //this '{...}' is made so we get a hard copy
    //because if we simply do 'queryObj = req.query' we will make a pointer

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObject[el]);

    this.query = this.query.find(queryObject);

    return this; //return the object to chain methods later
  }

  sort() {
    //sorting if requested
    if (this.queryString.sort) {
      //if there is a sort property in the query
      this.query.sort(this.queryString.sort);
      //query will be sorted by the value of the sort property (price, date...)
    }
    return this; //return the object to chain methods later
  }

  paginate() {
    //pagination
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;

    this.query.skip(skip).limit(limit);

    return this; //return the object to chain methods later
  }
}
module.exports = APIfeatures;
