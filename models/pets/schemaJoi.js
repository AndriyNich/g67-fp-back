const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string(),
  type: Joi.string().min(2).max(16),
  comments: Joi.string().max(120).empty(""),
});

module.exports = {
  addSchema,
};
