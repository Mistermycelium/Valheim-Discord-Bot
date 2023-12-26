import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserInterface {
  id?: number;
  Username?: string;
  email?: string;
  playerName?: string;
  SteamID?: string;
  XboxID?: string;
  DiscordID: string;
}

class User extends Model<UserInterface, UserInterface> implements UserInterface {
  id?: number;
  Username?: string;
  email?: string;
  playerName?: string;
  SteamID?: string;
  XboxID?: string;
  DiscordID!: string;
  static initModel(sequelize: Sequelize) {
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
          get() {
            const value = this.getDataValue('SteamID');
            return value ? value.toString() : null;
          },
        },
        XboxID: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        DiscordID: {
          type: DataTypes.BIGINT,
          unique: true,
          allowNull: false,
          get() {
            const value = this.getDataValue('DiscordID');
            return value !== null ? value.toString() : null;
          },
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

export { User, UserInterface };