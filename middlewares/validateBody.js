const { HttpError } = require('../helpers');

const validateBody = (schema, err = {}) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { status = 400, msg = error.message } = err;
      next(HttpError(status, msg));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
