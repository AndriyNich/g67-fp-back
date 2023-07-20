const path = require("path");
const fs = require("fs/promises");

const { HttpError, resizeImg } = require("../../helpers");
const { User } = require("../../models/user");
const { pathToFile, img } = require("../../constants");

const avatarsDir = path.join(
  __dirname,
  "../../",
  pathToFile.PUBLIC,
  pathToFile.AVATAR
);

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  const avatarURL = path.join(pathToFile.AVATAR, filename);

  await resizeImg(tempUpload, img.SIZE_X, img.SIZE_Y);

  await fs.rename(tempUpload, resultUpload);

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
      select: "avatarURL -_id",
    }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateAvatar;
