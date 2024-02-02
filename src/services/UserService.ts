/* eslint-disable no-shadow */
import IRepository from '../data/repositories/IRepository';
import EventEmitter from 'events';
import { IService } from '../interfaces/IService';
import { User, UserInterface } from '../data/models/User';
// import { injectable } from 'inversify';

// @injectable()
export default class UserService implements IService<User> {
  private eventEmitter: EventEmitter;

  constructor(
    private userRepository: IRepository<UserInterface>) {
    this.userRepository = userRepository;
    this.eventEmitter = new EventEmitter();
  }

  public async findBy(discordId: string): Promise<User> {
    await this.userRepository
      .findById(discordId)
      .then((user) => {
        if (user) {
          return user;
        }
      }, (err) => {
        throw new Error(`An error occurred when searching for user with DiscordId: ${discordId} , error: ${err}`);
      });
    throw new Error(`User ${discordId} not found`);
  }

  async create(user: User): Promise<User> {
    await this.userRepository
      .create(user)
      .then((created) => {
        console.log(`${created.Username}, DiscorId: ${user.DiscordId} was created successfully`);
        this.eventEmitter.emit('user.created', created);
        return created;
      }, (err) => {
        throw new Error(`Error creating ${user.Username}:, DiscorId: ${user.DiscordId}, error: ${err}`);
      });
    throw new Error(`Error creating ${user.Username}:, DiscorId: ${user.DiscordId}`);
  }

  async update(user: User): Promise<User> {
    await this.userRepository
      .update(user)
      .then((updated) => {
        console.log(`${updated.Username}, DiscorId: ${user.DiscordId} was Updated successfully`);
        this.eventEmitter.emit('user.updated', updated);
        return updated;
      }, (err) => {
        throw new Error(`Error updating ${user.Username}:, DiscorId: ${user.DiscordId}, error: ${err}`);
      });
    throw new Error(`Error updating ${user.Username}:, DiscorId: ${user.DiscordId}`);
  }

  async delete(user: User): Promise<void> {
    await this.userRepository.delete(user)
      .then(() => {
        console.log(`${user.Username}, DiscorId: ${user.DiscordId} was deleted successfully`);
        this.eventEmitter.emit('user.deleted', user.Username);
      }, (err) => {
        console.log(`Error deleting ${user.Username}:, DiscorId: ${user.DiscordId}`);
        throw err;
      });
  }
}
