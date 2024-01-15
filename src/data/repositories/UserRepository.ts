import { User, UserInterface } from '../Database';
import { UniqueConstraintError, ForeignKeyConstraintError, WhereOptions } from 'sequelize';
import IRepository from './IRepository';
import IListEntry from '../../interfaces/models/IListEntry';

class UserRepository implements IRepository<User> {
  async findBy(query: WhereOptions<IListEntry>): Promise<User[]> {
    return User.findAll({ where: query })
      .then(users => users.map(user => user.dataValues as User))
      .catch(err => {
        console.error('Error executing query', err);
        throw err;
      });
  }

  async findById(id: string): Promise<User> {
    await User.findOne({ where: { discordId: id } })
      .then((user) => {
        if (user) {
          return user.dataValues as User;
        }
      }, (err) => {
        throw err;
      });
    throw new Error(`User ${id} not found`);
  }

  async getAll(): Promise<User[]> {
    const result = await User.findAll();
    return result.map(item => item.dataValues as User);
  }

  async create(user: UserInterface): Promise<User> {
    const existingUser = await User.findOne({
      where: {
        discordId: user.discordId,
      },
    });
    if (existingUser) {
      return existingUser.update(user);
    } else {
      return User.create(user);
    }
  }

  async delete(user: UserInterface): Promise<void> {
    await User.destroy({
      where: {
        discordId: user.discordId,
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

  async update(user: UserInterface): Promise<User> {
    await User.update(user, {
      where: {
        discordId: user.discordId,
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
