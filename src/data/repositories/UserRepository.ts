import { User, UserInterface, UserServerStatus } from '../Database';
import { UniqueConstraintError, ForeignKeyConstraintError, WhereOptions } from 'sequelize';
import IRepository from './IRepository';
import { Mutex } from 'async-mutex';

class UserRepository implements IRepository<User,Boolean> {
  mutex: any;

  constructor() {
    this.mutex = new Mutex();
  }

  private releaseMutex() {
    this.mutex.release();
  }

  async findBy(query: WhereOptions): Promise<User[]> {
    return User.findAll({
      where: query,
      include: [{
        model: UserServerStatus,
        as: 'UserServerStatus',
        where: query,
        required: true,
      }],
    })
      .then(users => users.map(user => user.dataValues as User))
      .catch(err => {
        throw new Error(`Error executing query: ${JSON.stringify(query)}, error: ${err}`);
      });
  }

  async findById(id: string): Promise<User> {
    return await User.findOne({ where: { DiscordId: id } })
      .then((user) => {
        if (user) {
          return user.dataValues as User;
        } else {
          throw new Error(`User ${id} not found`);
        }
      }, (err) => {
        throw err;
      });
  }

  async getAll(): Promise<User[]> {
    return await User.findAll();
  }

  async create(user: UserInterface): Promise<User | Boolean> {
      const [existingUser, created] = await User.findOrCreate({
        where: {
          DiscordId: user.DiscordId,
        },
        defaults: user,
      });
      if (!created) {
        existingUser.update(user);
        return created; // existingUser.update(user);
      } else {
        return existingUser; // existingUser;
      }
  }

  async delete(query: WhereOptions): Promise<void> {
    this.mutex.acquire().then(async () => {
      await User.destroy({
        where: query,
      }).then((rowsDeleted) => {
        if (rowsDeleted === 1) {
          console.log('Deleted successfully');
        }
        this.releaseMutex();
      }).catch((err) => {
        if (err instanceof ForeignKeyConstraintError) {
          throw new Error(`The query: ${JSON.stringify(query, null, 2)} failed with Cause: ${err.message}.`);
        }
        throw err;
      });
    });
  }

  async update(user: User): Promise<User> {
    return this.mutex.acquire().then(async () => {
      await User.update(user, {
        where: {
          DiscordId: user.DiscordId,
        },
      }).then((updated) => {
        if (updated !== undefined) {
          console.log('Updated successfully');
          this.releaseMutex();
          return user;
        }
      }).catch((err) => {
        if (err instanceof UniqueConstraintError) {
          throw new Error(`${JSON.stringify(user, null, 2)} already exists`);
        }
      });
    });
  }
}

export { UserRepository };
