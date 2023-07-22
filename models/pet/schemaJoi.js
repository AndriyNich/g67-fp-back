const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string(),
  type: Joi.string(),
  comments: Joi.string(),
});

module.exports = {
  addSchema,
};
