import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserInterface {
  id?: number;
  username?: string;
  email?: string;
  playerName?: string;
  steamId?: string;
  xboxId?: string;
  discordId: string;
}

class User extends Model<UserInterface, UserInterface> implements UserInterface {
  id?: number;
  username?: string;
  email?: string;
  playerName?: string;
  steamId?: string;
  xboxId?: string;
  discordId!: string;
  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        Id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        Username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        PlayerName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        SteamId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        XboxId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        DiscordId: {
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
            if (!this.steamId && !this.xboxId) {
              throw new Error('Either steamId or xboxId must be set');
            }
          },
          discodIdRequired() {
            if (!this.discordId) {
              throw new Error('DiscordID must be set');
            }
          },
        },
      },
    );
  }
}

export { User, UserInterface };
