const { ctrlWrapper } = require('../../helpers');

const addNotice = require('./addNotice');
const getList = require('./getList');
const getNoticeById = require('./getNoticeById');
const deleteNoticeById = require('./deleteNoticeById');

module.exports = {
  addNotice: ctrlWrapper(addNotice),
  getList: ctrlWrapper(getList),
  getNoticeById: ctrlWrapper(getNoticeById),
  deleteNoticeById: ctrlWrapper(deleteNoticeById),
};
