const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const deleteFavoriteById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, {
    $pull: { favorites: id },
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Delete success" });
};

module.exports = deleteFavoriteById;
