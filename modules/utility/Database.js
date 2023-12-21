const { Sequelize } = require('sequelize');
const User = require('./models/User');
const Server = require('./models/Server');
const UserServerStatus = require('./models/UserServerStatus');

const db = new Sequelize('vhbot', 'VHBot', 'Taco', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: './devsequelize.sqlite',
});

User.init(db);
Server.init(db);
UserServerStatus.init(db);

User.belongsToMany(Server, { through: UserServerStatus });
Server.belongsToMany(User, { through: UserServerStatus });

module.exports = { db, User, Server, UserServerStatus };
// {
// db,
// getWhitelistData: async function() {
//   let result = await User.findAll();
//   result = result.map(item => item.dataValues);
//   return result;
// },

// addUser: async function(user) {
//   const result = await User.create(user);
//   return result;
// },

// removeUser: async function(user) {
//   const result = await User.destroy({
//     where: {
//       DiscordID: user.DiscordID,
//     },
//   });
//   return result;
// },

// updateUser: async function(user) {
//   const result = await User.update(user, {
//     where: {
//       DiscordID: user.DiscordID,
//     },
//   });
//   return result;
// },

// syncDatabase: function() {
//   db.sync({ alter: true })
//     .then(() => {
//       console.log('Database & tables created!');
//     })
//     .catch((error) => {
//       console.error('error: ', error);
//     });
// },
// };
