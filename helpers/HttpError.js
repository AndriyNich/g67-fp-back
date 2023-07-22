const errorMessageList = require('../constants');

const HttpError = (status, message = errorMessageList[status]) => {
  console.log(`HttpError: ${message}`);

  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
