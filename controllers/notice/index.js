const { ctrlWrapper } = require('../../helpers');

const addNotice = require('./addNotice');

module.exports = {
  addNotice: ctrlWrapper(addNotice),
};
