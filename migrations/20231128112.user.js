"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      last_name: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      user_name: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      user_password: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      phone_no: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      jwt_token: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
