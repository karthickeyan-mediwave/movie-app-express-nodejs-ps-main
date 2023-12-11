const express = require("express");
const router = express.Router();
const getRouter = express.Router({ mergeParams: true });
const { isAuthorised } = require("../middlewares/authorisation.middleware");

// const { getAccountController } = require("../controllers/user.controller");

router.use("/get-account", isAuthorised, getRouter);

// //VIEW THE USER DATA
// getRouter.get("/account-details", getAccountController);

module.exports = router;
