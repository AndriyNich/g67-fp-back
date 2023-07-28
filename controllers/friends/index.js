const { ctrlWrapper } = require("../../helpers");
const getList = require("./getList");

module.exports = {
  getList: ctrlWrapper(getList),
};
