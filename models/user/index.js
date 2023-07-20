const { registerSchema, loginSchema } = require("./schemaJoi");
const User = require("./schemaDb");

module.exports = {
  User,
  registerSchema,
  loginSchema,
};
