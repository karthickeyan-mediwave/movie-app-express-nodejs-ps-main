const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");

const addRatingController = async (req, res) => {
  try {
    const addRating = await models.rating.create({
      user_id: req.decoded.user_id,
      movie_id: req.query.movie_id,
      rating: req.body.rating,
    });
    return res.json({
      addRating,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
// upate rating
const updateRatingController = async (req, res) => {
  try {
    const itemsUpdate = await models.rating.update(
      {
        rating: req.body.rating,
        user_id: req.decoded.user_id,
      },
      {
        where: {
          movie_id: req.query.movie_id,
        },
        returning: true,
      }
    );
    return res.json({
      itemsUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
const overallRatingController = async (req, res) => {
  const ratings = await models.rating.findAndCountAll({
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("rating")), "overall_rating"],
    ],
    group: ["item_id"],
  });

  res.json({
    ratings,
  });
};
module.exports = {
  addRatingController,
  overallRatingController,
  updateRatingController,
};
