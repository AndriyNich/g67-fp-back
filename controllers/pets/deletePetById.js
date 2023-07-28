const { Pet } = require("../../models/pets");
const { HttpError } = require("../../helpers");

const deletePetById = async (req, res) => {
  const { id } = req.params;
  const result = await Pet.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

module.exports = deletePetById;
