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
          type: DataTypes.STRING,
          allowNull: true,
        },
        XboxID: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        DiscordID: {
          type: DataTypes.STRING,
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

export { User, UserInterface };
