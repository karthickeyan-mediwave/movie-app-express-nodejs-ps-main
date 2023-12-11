const helper = require("../services/helper");
const bcrypt = require("bcryptjs");

module.exports = function model(sequelize, types) {
  const users = sequelize.define(
    "users",
    {
      user_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: types.STRING,
        defaultValue: "",
      },
      last_name: {
        type: types.STRING,
        defaultValue: "",
      },
      user_name: {
        type: types.STRING,
        defaultValue: "",
        unique: true,
      },
      email: {
        type: types.STRING,
        defaultValue: "",
      },
      user_password: {
        type: types.STRING,
        defaultValue: "",
      },
      phone_no: {
        type: types.STRING,
        defaultValue: "",
      },
      jwt_token: {
        type: types.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          try {
            if (user.user_password) {
              user.user_password = await helper.hashPassword(
                user.user_password
              );
            }
          } catch (error) {
            console.log("\n save password hash error...", error);
          }
        },
        beforeUpdate: async (user) => {
          try {
            if (user.user_password) {
              user.user_password = await helper.hashPassword(
                user.user_password
              );
            }
          } catch (error) {
            console.log("\n update password hash error...", error);
          }
        },
      },
    },
    {
      tableName: "users",
      timestamps: false,
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );
  users.associate = function (models) {
    users.hasMany(models.movies, {
      as: "movies_user",
      foreignKey: "user_id",
      targetKey: "user_id",
    });
  };

  return users;
};
