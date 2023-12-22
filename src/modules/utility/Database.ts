import { Sequelize } from 'sequelize';
import User from './models/User';
import Server from './models/Server';
import UserServerStatus from './models/UserServerStatus';

const db = new Sequelize('vhbot', 'VHBot', 'Taco', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: './devsequelize.sqlite',
});

User.initModel(db);
Server.initModel(db);
UserServerStatus.initModel(db);

User.belongsToMany(Server, { through: UserServerStatus });
Server.belongsToMany(User, { through: UserServerStatus });

export { db, User, Server, UserServerStatus };
