const { Model, DataTypes } = require('sequelize');


class Server extends Model {
  static init(sequelize) {
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

module.exports = Server;
