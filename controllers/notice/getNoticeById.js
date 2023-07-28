const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const getNoticeById = async (req, res) => {
  const { id } = req.params;

  const notice = await Notice.findById(id, "-createdAt -updatedAt");
  if (!notice) {
    throw HttpError(404, "Not found");
  }
  const dataNotice = { ...JSON.parse(JSON.stringify(notice)), favorite: false };

  const _id = dataNotice.owner;
  const user = await User.findById(_id, "phone email");
  if (!user) {
    throw HttpError(404, "Not found");
  }

  const dataUser = JSON.parse(JSON.stringify(user));

  const result = { notice: dataNotice, user: dataUser };

  res.json(result);
};

module.exports = getNoticeById;
