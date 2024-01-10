import { User, UserInterface } from '../Database';
import { UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';
import Repository from './Repository';

class UserRepository implements Repository<User> {
  public async getAll(): Promise<User[]> {
    const result = await User.findAll();
    return result.map(item => item.dataValues as User);
  }

  public async create(user: UserInterface): Promise<User> {
    const existingUser = await User.findOne({
      where: {
        DiscordID: user.DiscordID,
      },
    });
    if (existingUser) {
      return existingUser.update(user);
    } else {
      return User.create(user);
    }
  }

  public async delete(user: UserInterface): Promise<void> {
    await User.destroy({
      where: {
        DiscordID: user.DiscordID,
      },
    }).then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        console.log('Deleted successfully');
      }
    }).catch((err) => {
      if (err instanceof ForeignKeyConstraintError) {
        throw new Error(`${JSON.stringify(user, null, 2)} is referenced by other entities.`);
      }
      throw err;
    });
  }

  public async update(user: UserInterface): Promise<User | Error> {
    await User.update(user, {
      where: {
        DiscordID: user.DiscordID,
      },
    }).then((updated) => {
      if (updated !== undefined) {
        console.log('Updated successfully');
        return user;
      }
    }).catch((err) => {
      if (err instanceof UniqueConstraintError) {
        throw new Error(`${JSON.stringify(user, null, 2)} already exists`);
      }
      throw err;
    });
    throw new Error(`${JSON.stringify(user, null, 2)} not found`);
  }
}

export { UserRepository, UserInterface };
