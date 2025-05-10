import { Sequelize } from 'sequelize';
import { User, UserInterface } from './models/User';


import dbConfig from '../../config/dbConfig.json';
import { Server } from './models/Server';
import { UserServerStatus } from './models/UserServerStatus';

const dbContext = new Sequelize({
  dialect: "sqlite",
  storage: "dbs/database.db",
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
