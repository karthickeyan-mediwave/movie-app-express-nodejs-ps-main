const express = require("express");
const router = express.Router();
const getRouter = express.Router({ mergeParams: true });

const {
  addMovieController,
  updateMovieController,
  getallMoviescontroller,
} = require("../controllers/movies.controller");

const { isAuthorised } = require("../middlewares/authorisation.middleware");

router.use("/", isAuthorised, getRouter);
getRouter.get("/movies", getallMoviescontroller);
getRouter.post("/add-movie", addMovieController);
getRouter.put("/update-movie", updateMovieController);

// //VIEW THE USER DATA

module.exports = router;
