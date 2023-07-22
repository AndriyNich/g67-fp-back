const { HttpError } = require('../helpers');

const validateBody = (schema, err = {}) => {
  // console.log(`validateBody 0`);

  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // console.log(`validateBody Error`);
      const { status = 400, msg = error.message } = err;
      next(HttpError(status, msg));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
