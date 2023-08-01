const checkDate = (date, next) => {
  if (new Date(date) > new Date()) {
    const err = new Error('Date is greater than the current date');
    err.status = 400;
    return next(err);
  }
  next();
};

const handleMongooseCheckDate = function (next) {
  return checkDate(this.birthday, next);
};

const handleMongooseCheckDateForPatch = function (next) {
  const { birthday } = this.getUpdate();
  return checkDate(birthday, next);
};

module.exports = {
  handleMongooseCheckDate,
  handleMongooseCheckDateForPatch,
};
