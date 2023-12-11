const express = require("express");
const router = express.Router();

const {
  addUserController,
  updateUserController,
  loginController,
  getAccountController,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  signUpSchema,
  updateUserSchema,
  LoginSchema,
} = require("../validations/authentication.schema");

//CREATE USER ACCOUNT
router.post("/signup", validate(signUpSchema), addUserController);

// //LOGIN
router.post("/login", validate(LoginSchema), loginController);

// //UPDATE USER DATA
router.put("/update-user", validate(updateUserSchema), updateUserController);

const { isAuthorised } = require("../middlewares/authorisation.middleware");

router.use("/get-account", isAuthorised, getAccountController);

// //VIEW THE USER DATA

module.exports = router;
