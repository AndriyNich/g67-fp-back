const { Notice } = require("../../models/notice");
const { HttpError } = require("../../helpers");

const getNoticeById = async (req, res) => {
  const { id } = req.params;

  const result = await Notice.findById(id, "-createdAt -updatedAt");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  const data = { ...JSON.parse(JSON.stringify(result)), favorite: false };

  res.json(data);
};

module.exports = getNoticeById;
