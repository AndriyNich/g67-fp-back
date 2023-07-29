const { emailRegexp } = require("./regexp");
const errorMessageList = require("./errorMessageList");
const { categoryNoticeList, sexPetList } = require("./enumNotices");
const { PER_PAGE } = require("./pagination");

module.exports = {
  emailRegexp,
  errorMessageList,
  categoryNoticeList,
  sexPetList,
  PER_PAGE,
};
