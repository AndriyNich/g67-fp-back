const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true, select: "-createdAt -updatedAt" }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;
