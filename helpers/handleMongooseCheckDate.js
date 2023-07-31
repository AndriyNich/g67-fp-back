const handleMongooseCheckDate = function (next) {
  if (new Date(this.birthday) > new Date()) {
    const err = new Error("Date is greater than the current date");
    err.status = 400;
    return next(err);
  }
  next();
};

module.exports = handleMongooseCheckDate;
