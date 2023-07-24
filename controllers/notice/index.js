const { ctrlWrapper } = require('../../helpers');

const addNotice = require('./addNotice');
const getList = require('./getList');
const getNoticeById = require('./getNoticeById');
const deleteNoticeById = require('./deleteNoticeById');
const addNoticeByIdToUserFavorite = require('./addNoticeByIdToUserFavorite');
const getFavoriteListByUserId = require('./getFavoriteListByUserId');

module.exports = {
  addNotice: ctrlWrapper(addNotice),
  getList: ctrlWrapper(getList),
  getNoticeById: ctrlWrapper(getNoticeById),
  deleteNoticeById: ctrlWrapper(deleteNoticeById),
  addNoticeByIdToUserFavorite: ctrlWrapper(addNoticeByIdToUserFavorite),
  getFavoriteListByUserId: ctrlWrapper(getFavoriteListByUserId),
};
