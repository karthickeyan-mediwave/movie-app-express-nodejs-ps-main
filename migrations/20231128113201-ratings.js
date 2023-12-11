"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("rating", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      rating_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primarykey: true,
        unique: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      movie_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "movies",
          },
          key: "movie_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      rating: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("rating");
  },
};
