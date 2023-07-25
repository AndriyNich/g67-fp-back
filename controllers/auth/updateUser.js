const { User } = require('../../models/user');

const updateUser = async (req, res) => {
  const { user } = req;

  let updateUser = Object.assign(user, req.body);

  const avatarURL = req?.file?.path;
  if (avatarURL) {
    updateUser = Object.assign(updateUser, { avatarURL });
  }
  await User.findByIdAndUpdate(user._id, updateUser);

  res.status(200).json({
    user: {
      name: updateUser.name,
      email: updateUser.email,
      phone: updateUser.phone,
      city: updateUser.city,
      birthday: updateUser.birthday,
      avatarURL: updateUser.avatarURL,
    },
  });
};

module.exports = updateUser;
