const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        Username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        playerName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        SteamID: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        XboxID: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        DiscordID: {
          type: DataTypes.BIGINT,
          unique: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        validate: {
          eitherSteamIdOrXboxId() {
            if (!this.SteamID && !this.XboxID) {
              throw new Error('Either steamId or xboxId must be set');
            }
          },
        },
      },
    );
  }
}

module.exports = User;
