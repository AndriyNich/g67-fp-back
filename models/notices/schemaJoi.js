const Joi = require("joi");

const { categoryNoticeList, sexPetList } = require("../../constants");

const addSchema = Joi.object({
  category: Joi.string()
    .valid(...categoryNoticeList)
    .required()
    .empty(false),
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().required(),
  type: Joi.string().min(2).max(16).required(),
  title: Joi.string().empty(false),
  sex: Joi.string()
    .valid(...sexPetList)
    .required(),
  location: Joi.string().required().empty(false),
  price: Joi.alternatives().conditional("category", {
    is: "sell",
    then: Joi.number().required().empty(false),
    otherwise: Joi.number(),
  }),
  comments: Joi.string(),
});

module.exports = {
  addSchema,
};
