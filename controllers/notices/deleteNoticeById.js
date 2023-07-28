const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers");

const deleteNoticeById = async (req, res) => {
  const { id } = req.params;

  const { _id: owner } = req.user;

  let result = await Notice.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  if (String(result.owner) !== String(owner)) {
    throw HttpError(404, "The notice belongs to another user");
  }

  result = await Notice.findByIdAndRemove(id);

  res.json({ message: "Delete success" });
};

module.exports = deleteNoticeById;
