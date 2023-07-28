const { Notice } = require("../../models/notices");

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;

  let { AVATAR_PET_DEFAULT: file } = process.env;

  const avatarURL = req?.file?.path;
  if (avatarURL) {
    file = avatarURL;
  }

  const notice = await Notice.create({
    avatarURL: file,
    ...req.body,
    owner,
  });

  res.status(201).json({
    notice,
  });
};

module.exports = addNotice;
