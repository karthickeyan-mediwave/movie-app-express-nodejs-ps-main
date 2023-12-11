const Joi = require("joi");

const buyItemSchema = Joi.object({
  item_id: Joi.string().required(),
  user_id: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = { buyItemSchema };
