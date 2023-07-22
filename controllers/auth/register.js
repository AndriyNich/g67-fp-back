const bcrypt = require('bcrypt');

const { User } = require('../../models/user');
const { HttpError, createTokenForUserId } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const { AVATAR_USER_DEFAULT } = process.env;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: AVATAR_USER_DEFAULT,
  });

  const token = createTokenForUserId(newUser._id);
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: AVATAR_USER_DEFAULT,
    },
  });
};

module.exports = register;
