const { Pet } = require('../../models/pet');

const getPets = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Pet.find({ owner }, '-createdAt -updatedAt');
  res.json(result);
};

module.exports = getPets;
