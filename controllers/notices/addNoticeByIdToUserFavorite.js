const { User } = require("../../models/users");
const { Notice } = require("../../models/notices");

const { HttpError } = require("../../helpers");

const addNoticeByIdToUserFavorite = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  const resultNotice = await Notice.findById(id);

  if (!resultNotice) {
    throw HttpError(404, "The notice not found");
  }

  await User.findByIdAndUpdate(
    _id,
    {
      $addToSet: { favorites: id },
    },
    { new: true }
  );

  res.status(200).json({
    message: "The notice has been successfully added to your favorites",
  });
};

module.exports = addNoticeByIdToUserFavorite;
