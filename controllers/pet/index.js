const { ctrlWrapper } = require('../../helpers');

const addPet = require('./addPet');
const deletePetById = require('./deletePetById');

module.exports = {
  addPet: ctrlWrapper(addPet),
  deletePetById: ctrlWrapper(deletePetById),
};
