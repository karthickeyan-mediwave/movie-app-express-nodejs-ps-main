const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");

module.exports = {
  isAuthorised: async (req, res, next) => {
    try {
      let token = req.headers.Authorization || req.headers.authorization;

      if (token) {
        token = token.substr("Bearer ".length);
        const decoded = await jwt.verify(token, config.jwtSecret);
        req.decoded = decoded;
        let auth_token = await models.users.findOne({
          where: {
            user_id: req.query.user_id || req.decoded.user_id,
          },
          returning: true,
        });
        if (!auth_token) {
          return res.status(401).send("unauthorised not decoded");
        }
        req.decoded = decoded;
        return next();
      }
      return res.status(401).send("unauthorised or no token");
    } catch (error) {
      console.log("\n isAuthorised error...", error);
      return res.status(401).send("unauthorised");
    }
  },
};
