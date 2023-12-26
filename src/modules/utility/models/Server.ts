import { Model, DataTypes, Sequelize } from 'sequelize';

interface ServerInstance extends Model {
  id: string;
  name: string;
  guildId: string;
  ip: string;
  port: number;
}

class Server extends Model<ServerInstance> {
  static initModel(sequelize: Sequelize) {
    return super
      .init(
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          guildId: {
            type: DataTypes.BIGINT,
            allowNull: false,
          },
          ip: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          port: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        },
        {
          sequelize,
          modelName: 'Server',
        },
      );
  }
}

export default Server;
