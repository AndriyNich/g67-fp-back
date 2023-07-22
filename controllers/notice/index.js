const { ctrlWrapper } = require('../../helpers');

const addNotice = require('./addNotice');
const getList = require('./getList');

module.exports = {
  addNotice: ctrlWrapper(addNotice),
  getList: ctrlWrapper(getList),
};
