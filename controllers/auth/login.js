const bcrypt = require("bcrypt");

const { User } = require("../../models/users");
const { HttpError, createTokenForUserId } = require("../../helpers");

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

  const token = createTokenForUserId(user._id);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = login;
