## DB migrations

Need **sequelize-cli**

- To generate the new migration file

First go inside app directory

> cd app

Then execute whatever command you need

`npx sequelize-cli migration:generate --name <module_name>`

- To upgrade the db

  `npx sequelize-cli db:migrate`

- To upgrade specific migration

  `npx sequelize-cli db:migrate --from <file name> --to <file name>`

- To upgrade n number of migrations

  `npx sequelize-cli db:migrate --to <file name>`

- To downgrade the db

  `npx sequelize-cli db:migrate:undo`

- To downgrade the specific db

- To downgrade the migration untill specific file

  `npx sequelize-cli db:migrate:undo:all --to <file name>`

## DB seeders

- To generate the new seeders file

  `npx sequelize-cli seed:generate --name <module_name>`

- To upgrade the seeders

  `npx sequelize-cli db:seed:all`

- To downgrade the seeders

  `npx sequelize-cli db:seed:undo:all`

- To upgrade specify seed

  `npx sequelize-cli db:seed --seed <file name>`

- To downgrade the specific seed

  `npx sequelize-cli db:seed:undo --seed <file name>`

for more info visit [Documentation](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

## Installation

`npm install`

## Data Sync

- To create database with required data

  `node app/sync.js`

## Start

`npm start`

## On delete Cascade

`
drop table if exists table_name cascade

`

const loginController = async (req, res) => {
searchUser = await models.users.findAndCountAll({
where: {
user_name: req.body.user_name,
},
returning: true,
});

if (!searchUser.count == 0) {
try {
const passwordMatch = await helper.comparePassword(
req.body.user_password,
searchUser.user_password
);

      if (!passwordMatch) {
        const payload = {
          user_id: searchUser.user_id,
          user_name: searchUser.user_name,
        };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
        // const updateUser = await searchUser.update(
        //   {
        //     jwt_token: token,
        //   },
        //   {
        //     where: {
        //       user_name: req.body.user_name,
        //     },
        //   }
        // );
        return res.json({
          token,
          // updateUser,
        });
      } else {
        return res.status(402).json({ message: "pass." });
      }
    } catch (error) {
      console.log(error);

      return res.send(error);
    }

} else {
return res.status(402).json({ message: "User not found." });
}
};
