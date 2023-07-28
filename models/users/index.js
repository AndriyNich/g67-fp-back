const { registerSchema, loginSchema, updateSchema } = require('./schemaJoi');
const User = require('./schemaDb');

module.exports = {
  User,
  registerSchema,
  loginSchema,
  updateSchema,
};
