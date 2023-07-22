const cloudinary = require('cloudinary').v2;

const { User } = require('../../models/user');

cloudinary.config({
  secure: true,
});

const updateUser = async (req, res) => {
  const { user } = req;
  const updateUser = Object.assign(user, req.body);
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
