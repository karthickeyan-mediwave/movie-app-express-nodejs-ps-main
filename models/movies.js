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
    movies.hasMany(models.users, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  };

  return movies;
};
