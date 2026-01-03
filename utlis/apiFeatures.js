class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const exclude = ["page", "sort", "limit"];
    exclude.forEach(el => delete queryObj[el]);

    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort === "newest") {
      this.query = this.query.sort({ createdAt: -1 });
    } else {
      this.query = this.query.sort({ createdAt: 1 });
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
