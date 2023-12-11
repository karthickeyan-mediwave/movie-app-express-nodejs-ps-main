module.exports = function model(sequelize, types) {
  const rating = sequelize.define(
    "rating",
    {
      rating_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      user_id: {
        type: types.UUID,
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
        type: types.UUID,
        references: {
          model: {
            tableName: "items",
          },
          key: "movie_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      rating: {
        type: types.INTEGER,
      },
    },
    {
      tableName: "rating",
      timestamps: false,
    }
  );

  rating.associate = function (models) {
    rating.belongsTo(models.movies, {
      as: "rating_movies",
      foreignKey: "movie_id",
      sourceKey: "movie_id",
    }),
      rating.belongsTo(models.users, {
        as: "rating_user",
        foreignKey: "user_id",
        sourceKey: "user_id",
      });
  };

  return rating;
};
