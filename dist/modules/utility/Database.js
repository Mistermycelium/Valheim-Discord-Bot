'use strict';
const __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = require('sequelize');
const User_1 = __importDefault(require('./models/User'));
const Server_1 = __importDefault(require('./models/Server'));
const UserServerStatus_1 = __importDefault(require('./models/UserServerStatus'));
const db = new sequelize_1.Sequelize('vhbot', 'VHBot', 'Taco', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: './devsequelize.sqlite',
});
User_1.default.init(db);
Server_1.default.init(db);
UserServerStatus_1.default.init(db);
User_1.default.belongsToMany(Server_1.default, { through: UserServerStatus_1.default });
Server_1.default.belongsToMany(User_1.default, { through: UserServerStatus_1.default });
module.exports = { db, User: User_1.default, Server: Server_1.default, UserServerStatus: UserServerStatus_1.default };
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
