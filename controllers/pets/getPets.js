const { Pet } = require("../../models/pets");

const getPets = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Pet.find({ owner }, "-createdAt -updatedAt").sort({
    updatedAt: -1,
  });
  res.json(result);
};

module.exports = getPets;
