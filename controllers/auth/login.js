const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const messageConnectInvalid = "Email or password is wrong";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, messageConnectInvalid);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, messageConnectInvalid);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { email, subscription: user.subscription } });
};

module.exports = login;
