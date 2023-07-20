const Joi = require("joi");

const { emailRegexp } = require("../../constants");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  favoriteSchema,
};
