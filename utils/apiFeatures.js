class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const qryObj = { ...this.queryString };
    // 1a}
    const fltrarr = ['sort', 'page', 'fields', 'limit'];
    fltrarr.forEach((el) => delete qryObj[el]);
    // console.log(req.query, qryObj);
    // 1b}
    let qrystr = JSON.stringify(qryObj);
    qrystr = qrystr.replace(/\b(gt|gte|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(qrystr);
    // query formation
    this.query = this.query.find(JSON.parse(qrystr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortstr = this.queryString.sort.split(',').join(' ');
      console.log(sortstr);
      this.query = this.query.sort(sortstr);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    this.queryString.page = this.queryString.page || 1;
    this.queryString.limit = this.queryString.limit || 10;
    // console.log(this.queryString.limit, this.queryString.page);
    const page = this.queryString.page * 1;
    const limit = this.queryString.limit * 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIfeatures;
