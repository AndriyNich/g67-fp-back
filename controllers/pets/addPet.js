const { Pet } = require("../../models/pets");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;

  let { AVATAR_PET_DEFAULT: file } = process.env;

  const avatarURL = req?.file?.path;
  if (avatarURL) {
    file = avatarURL;
  }

  const pet = await Pet.create({
    avatarURL: file,
    ...req.body,
    owner,
  });

  res.status(201).json({
    pet,
  });
};

module.exports = addPet;
