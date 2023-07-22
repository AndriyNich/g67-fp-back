const { Pet } = require('../../models/pet');

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.user);
  console.log(owner);

  const { AVATAR_PET_DEFAULT } = process.env;

  const pet = await Pet.create({
    ...req.body,
    owner,
    avatarURL: AVATAR_PET_DEFAULT,
  });

  res.status(201).json({
    pet,
  });
};

module.exports = addPet;
