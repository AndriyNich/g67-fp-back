const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    select: "-createdAt -updatedAt",
  });

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateById;
