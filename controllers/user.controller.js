const config = require("../config/config");
const { models } = require("../config/sequelize-config");
const helper = require("../services/helper");
const jwt = require("jsonwebtoken");

const addUserController = async (req, res) => {
  const searchUser = await models.users.findAndCountAll({
    attributes: ["email", "user_name"],
    where: {
      email: req.body.email,
      user_name: req.body.user_name,
    },
    returning: true,
  });

  if (searchUser.count == 0) {
    try {
      const userCreate = await models.users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        phone_no: req.body.phone_no,
      });
      return res.status(200).json({
        userCreate,
        message: "user created sucessfully",
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.message);

      return res.send(error);
    }
  } else {
    return res.status(400).json({ message: "User already exists." });
  }
};

//updating the userData
const updateUserController = async (req, res) => {
  try {
    const updateUser = await models.users.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        phone_no: req.body.phone_no,
      },
      {
        where: {
          user_id: req.decoded.user_id,
        },
        returning: true,
        individualHooks: true,
      }
    );

    res.json({
      updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// login
const loginController = async (req, res, next) => {
  try {
    searchUser = await models.users.findOne({
      where: {
        user_name: req.body.user_name,
      },
      returning: true,
    });

    if (!searchUser) {
      return res.status(400).json({ message: "User not found." });
    } else {
      const passwordMatch = await helper.comparePassword(
        req.body.user_password,
        searchUser.user_password
      );

      if (passwordMatch) {
        const payload = {
          user_id: searchUser.user_id,
          user_name: searchUser.user_name,
        };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "4h" });

        return res.json({
          token,
        });
      } else {
        return res
          .status(400)
          .json({ message: "password wrong. check the password" });
      }
    }
  } catch (error) {
    return res.send(error);
  }
};
const getAccountController = async (req, res, next) => {
  try {
    const usersFind = await models.users.findOne({
      attributes: ["email", "user_name"],
      where: {
        user_name: req.query.user_name || req.decoded.user_name,
      },
      logging: true,
    });
    return res.json({
      usersFind,
    });
  } catch (error) {
    console.log("\n error...", error);
    return res.send(error);
  }
};

module.exports = {
  addUserController,
  updateUserController,
  loginController,
  getAccountController,
};
