const getQueryString = {
  queryString: {},
  request: {},
  setRequest(req) {
    this.request = req;
    return this;
  },
  addTitle() {
    const { title = "" } = this.request.query;
    if (title) {
      this.queryString = {
        ...this.queryString,
        title: { $regex: title, $options: "i" },
      };
    }
    return this;
  },
  addCategory() {
    const { category = "" } = this.request.query;
    if (category) {
      this.queryString = { ...this.queryString, category };
    }
    return this;
  },
  addOwner() {
    const { _id: owner } = this.request.user;
    this.queryString = { owner, ...this.queryString };
    return this;
  },
};

module.exports = getQueryString;
