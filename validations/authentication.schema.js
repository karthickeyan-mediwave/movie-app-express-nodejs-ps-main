const Joi = require("joi");

const signUpSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  user_name: Joi.string().min(3).required(),
  user_password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*_=+-]{8,20}$"))
    .required(),
  phone_no: Joi.number(),
});

const updateUserSchema = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  user_name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9^_-]{8,20}$"))
    .optional(),
  user_password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*_=+-]{8,20}$"))
    .optional(),
  phone_no: Joi.string().pattern(new RegExp("^[0-9]{7,15}$")).optional(),
});
// const signUpSchema = Joi.object().keys({
//   first_name: Joi.string()
//     .min(5)
//     .max(10)
//     .required()
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.code) {
//           case "string.empty":
//             err.message = "Value should not be empty!";
//             break;
//           case "string.min":
//             err.message = `Value should have at least ${err.local.limit} characters!`;
//             break;
//           case "string.max":
//             err.message = `Value should have at most ${err.local.limit} characters!`;
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),
// });
const LoginSchema = Joi.object().keys({
  user_name: Joi.string().required().messages({
    "string.empty": ` Username cannot be an empty field`,
    "string.min": ` Username should have a minimum length of {#limit}`,
    "any.required": `Username is a required field`,
  }),
  user_password: Joi.string().required().messages({
    "string.empty": ` Username cannot be an empty field`,
    "any.required": `Username is a required field`,
  }),
});

module.exports = {
  signUpSchema,
  updateUserSchema,
  LoginSchema,
};
