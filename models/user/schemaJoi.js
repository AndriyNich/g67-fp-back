const Joi = require("joi");

const { emailRegexp, subscriptionList } = require("../../constants");

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

module.exports = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};
