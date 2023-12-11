const Joi = require("joi");

const itemaddSchema = Joi.object({
  item_name: Joi.string().required().min(5),
  item_content: Joi.string().required(),
  price: Joi.number().required(),
  item_count: Joi.number().required(),
});
const updateitemSchema = Joi.object({
  item_name: Joi.string().required(),
  item_content: Joi.string().required(),
  item_id: Joi.number().required(),
});

module.exports = {
  itemaddSchema,
  updateitemSchema,
};
