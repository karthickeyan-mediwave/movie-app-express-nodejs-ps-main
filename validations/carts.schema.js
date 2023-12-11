const Joi = require("joi");

const addToCartSchema = Joi.object({
  item_id: Joi.number().required(),
  item_name: Joi.string().required(),
  user_id: Joi.number().required(),
  item_price: Joi.number().precision(2).required(),
});

module.exports = {
  addToCartSchema,
};
