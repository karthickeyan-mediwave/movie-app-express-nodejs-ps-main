const express = require("express");
const router = express.Router();
const getRouter = express.Router({ mergeParams: true });

const { validate } = require("../middlewares/validate.middleware");
const { ratingValueSchema } = require("../validations/rating.schema");
const {
  addRatingController,
  updateRatingController,
} = require("../controllers/addRating.controller");
const { isAuthorised } = require("../middlewares/authorisation.middleware");

router.post(
  "/add-rating",
  validate(ratingValueSchema),
  isAuthorised,
  addRatingController
);
router.put(
  "/update-rating",
  validate(ratingValueSchema),
  isAuthorised,
  updateRatingController
);

module.exports = router;
