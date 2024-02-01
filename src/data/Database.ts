import { Dialect, Sequelize } from 'sequelize';
import { User, UserInterface } from './models/User';
import Server from './models/Server';
import UserServerStatus from './models/UserServerStatus';

import dbConfig from '../../config/dbConfig.json';

const dbContext = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password!, {
  host: dbConfig.host,
  port: 2561,
  dialect: dbConfig.dialect as Dialect,
  logging: false,
});

User.initModel(dbContext);
Server.initModel(dbContext);
syncDbContext();

UserServerStatus.initModel(dbContext);
syncUserServerStatus();

User.belongsToMany(Server, { through: UserServerStatus, foreignKey: 'UserId'});
Server.belongsToMany(User, { through: UserServerStatus, foreignKey: 'ServerId'});

async function syncDbContext() {
  await dbContext.sync({ alter: true });
}

async function syncUserServerStatus() {
  await UserServerStatus.sync({ alter: true });
}

export { dbContext, User, UserInterface, Server, UserServerStatus };
