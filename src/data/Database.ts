import { Sequelize } from 'sequelize';
import { User, UserInterface } from './models/User';
import Server from './models/Server';
import UserServerStatus from './models/UserServerStatus';

const dbContext = new Sequelize('vhbot', 'VHBot', 'Taco', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: './dbs/dev.sqlite',
});

User.initModel(dbContext);
Server.initModel(dbContext);
UserServerStatus.initModel(dbContext);

User.belongsToMany(Server, { through: UserServerStatus });
Server.belongsToMany(User, { through: UserServerStatus });

export { dbContext, User, UserInterface, Server, UserServerStatus };
