const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("./schemaJoi");
const User = require("./schemaDb");

module.exports = {
  User,
  registerSchema,
  loginSchema,
  subscriptionSchema,
};
