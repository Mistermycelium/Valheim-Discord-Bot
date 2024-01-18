import { Model, DataTypes, Sequelize } from 'sequelize';

interface ServerInstance extends Model {
  id: string;
  name: string;
  guildId: string;
  host: string;
  port: number;
}

class Server extends Model<ServerInstance> {
  static initModel(sequelize: Sequelize) {
    return super
      .init(
        {
          Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          Name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          GuildId: {
            type: DataTypes.BIGINT,
            allowNull: false,
          },
          Host: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          Port: {
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
