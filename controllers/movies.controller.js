const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addMovieController = async (req, res) => {
  const searchMovies = await models.movies.findAndCountAll({
    attributes: ["movie_name"],
    where: {
      movie_name: req.body.movie_name,
    },
    returning: true,
  });
  if (searchMovies.count == 0) {
    try {
      const movieCreate = await models.movies.create({
        movie_name: req.body.movie_name,
        user_id: req.decoded.user_id,
      });
      return res.json({
        movieCreate,
      });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  } else {
    return res.status(400).json({ message: "movie already exists." });
  }
};
// update item content
const updateMovieController = async (req, res) => {
  try {
    const itemsUpdate = await models.movies.update(
      {
        movie_name: req.body.movie_name,
        user_id: req.decoded.user_id,
      },
      {
        where: {
          movie_name: req.query.movie_name,
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
// get all items
const getallitemcontroller = async (req, res) => {
  try {
    const items = await models.items.findAll();

    return res.json({
      items,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// get single item by id
const getbysingleitemcontroller = async (req, res) => {
  try {
    const items = await models.items.findAll({
      where: {
        item_id: req.query.item_id,
      },
    });

    return res.json({
      items,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// Sort price
const sortItemPriceController = async (req, res) => {
  try {
    const { sortOrder } = req.query;

    if (sortOrder && (sortOrder === "asc" || sortOrder === "desc")) {
      const items = await models.items.findAll({
        order: [["price", sortOrder]],
      });

      return res.json({
        items,
      });
    } else {
      return res.status(400).json({
        error: 'Invalid sortOrder parameter. Use "asc" or "desc".',
      });
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

// sort  item name
const sortItemNameController = async (req, res) => {
  try {
    const { sortOrder } = req.query;

    if (
      sortOrder &&
      (sortOrder.toLowerCase() === "asc" || sortOrder.toLowerCase() === "desc")
    ) {
      const items = await models.items.findAll({
        order: [["item_name", sortOrder.toUpperCase()]],
      });

      return res.json({
        items,
      });
    } else {
      return res.status(400).json({
        error: 'Invalid sortOrder parameter. Use "asc" or "desc".',
      });
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

// filter by price

const filterItemPricecontroller = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    const items = await models.items.findAll({
      where: {
        price: {
          [Op.between]: [minPrice, maxPrice],
        },
      },
      order: [["price", "ASC"]],
    });

    return res.json({
      items,
    });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

//  search by item name
const SearchItemNamecontroller = async (req, res) => {
  try {
    const itemsFind = await models.items.findAndCountAll({
      attributes: ["item_name"],
      where: {
        item_name: {
          [Op.iLike]: `%${req.query.item_name}%`,
        },
      },
      logging: true,
    });
    return res.json({
      itemsFind,
    });
  } catch (error) {
    console.log("\n error...", error);
    return res.send(error);
  }
};
module.exports = {
  addMovieController,
  updateMovieController,
  getallitemcontroller,
  getbysingleitemcontroller,
  filterItemPricecontroller,
  SearchItemNamecontroller,
  sortItemNameController,
  sortItemPriceController,
};
