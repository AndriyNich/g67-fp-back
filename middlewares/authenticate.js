const jwt = require("jsonwebtoken");

const { User } = require("../models/users");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer" || !token) {
      throw HttpError(401, "Unauthorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Unauthorized"));
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, "Unauthorized"));
  }
};

module.exports = authenticate;
