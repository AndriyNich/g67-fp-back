const { ctrlWrapper } = require("../../helpers");

const addNotice = require("./addNotice");
const getList = require("./getList");
const getNoticeById = require("./getNoticeById");

module.exports = {
  addNotice: ctrlWrapper(addNotice),
  getList: ctrlWrapper(getList),
  getNoticeById: ctrlWrapper(getNoticeById),
};
