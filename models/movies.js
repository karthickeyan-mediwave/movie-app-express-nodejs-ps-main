module.exports = function model(sequelize, types) {
  const movies = sequelize.define(
    "movies",
    {
      movie_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      movie_name: {
        type: types.STRING,
        defaultValue: "",
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
    },

    {
      tableName: "movies",
      timestamps: false,
    }
  );
  movies.associate = function (models) {
    movies.belongsTo(models.users, {
      // as: "movies_user",
      foreignKey: "user_id",
      targetKey: "user_id",
    });
  };
  movies.associate = function (models) {
    movies.belongsTo(models.rating, {
      foreignKey: "movie_id",
      targetKey: "movie_id",
    });
  };

  return movies;
};
