const Joi = require('joi');

const { categoryNoticeList, sexPetList } = require('../../constants');

const addSchema = Joi.object({
  category: Joi.string()
    .valid(...categoryNoticeList)
    .required(),
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().required(),
  type: Joi.string().min(2).max(16).required(),
  sex: Joi.string()
    .valid(...sexPetList)
    .required(),
  location: Joi.string().min(2).required(),
  price: Joi.number(),
  comments: Joi.string().max(120),
});

module.exports = {
  addSchema,
};
