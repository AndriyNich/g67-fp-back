const jwt = require("jsonwebtoken");

const { TOKEN_EXPIRES_IN, SECRET_KEY } = process.env;

const createTokenForUserId = (userId) => {
  const payload = {
    id: userId,
  };

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
};

module.exports = createTokenForUserId;
