const { Notice } = require('../../models/notice');

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;

  const { AVATAR_PET_DEFAULT } = process.env;

  const notice = await Notice.create({
    avatarURL: AVATAR_PET_DEFAULT,
    ...req.body,
    owner,
  });

  res.status(201).json({
    notice,
  });
};

module.exports = addNotice;
