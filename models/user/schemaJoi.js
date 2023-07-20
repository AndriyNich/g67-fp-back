const Joi = require("joi");

const { emailRegexp } = require("../../constants");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(16).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
