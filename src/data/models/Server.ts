import { Model, DataTypes, Sequelize } from 'sequelize';

interface ServerInstance extends Model {
  Id: number;
  Name: string;
  GuildId: string;
  Host: string;
  Port: number;
}

class Server extends Model<ServerInstance> {
  Id?:number;
  Name!: string;
  GuildId!: string;
  Host!: string;
  Port!: number;
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
          timestamps: false,
        },
      );
  }
}

export default Server;
