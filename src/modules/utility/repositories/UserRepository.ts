import { User } from '../Database';
import { UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';

interface UserInterface extends User {
  id: number;
  Username: string;
  email: string;
  playerName: string;
  SteamID: number;
  XboxID: string;
  DiscordID: number;
}

class UserRepository {
  async getWhitelistData() {
    let result = await User.findAll();
    result = result.map(item => item.dataValues);
    return result;
  }

  async addUser(user: UserInterface) {
    const existingUser = await User.findOne({
      where: {
        DiscordID: user.DiscordID,
      },
    });
    if (existingUser) {
      // Update the user information
      return this.updateUser(user);
    } else {
      // Add the new user
      return User.create(user);
    }
  }

  async removeUser(user: UserInterface) {
    try {
      const result = await User.destroy({
        where: {
          DiscordID: user.DiscordID,
        },
      });
      return result;
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        throw new Error(`${JSON.stringify(user, null, 2)} is referenced by other entities.`);
      }
      throw error;
    }
  }

  async updateUser(user: UserInterface) {
    try {
      const result = await User.update(user, {
        where: {
          DiscordID: user.DiscordID,
        },
      });
      return result;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new Error(`${JSON.stringify(user, null, 2)} already exists`);
      }
      throw error;
    }
  }
}

export default UserRepository;
