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
UserServerStatus.initModel(dbContext);

User.belongsToMany(Server, { through: UserServerStatus });
Server.belongsToMany(User, { through: UserServerStatus });

async function syncModels() {
  await User.sync({ alter: true });
  await Server.sync({ alter: true });
  await UserServerStatus.sync({ alter: true });
}

syncModels();

export { dbContext, User, UserInterface, Server, UserServerStatus };
