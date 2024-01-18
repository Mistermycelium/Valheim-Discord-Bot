/* eslint-disable no-shadow */
import { injectable } from 'inversify';
import IRepository from '../data/repositories/IRepository';
import EventEmitter from 'events';
import { IService } from '../interfaces/IService';
import { User, UserInterface } from '../data/models/User';

@injectable()
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
        throw new Error(`An error occurred when searching for user with discordId: ${discordId} , error: ${err}`);
      });
    throw new Error(`User ${discordId} not found`);
  }

  async create(user: User): Promise<User> {
    await this.userRepository
      .create(user)
      .then((created) => {
        console.log(`${created.username}, DiscorId: ${user.discordId} was created successfully`);
        this.eventEmitter.emit('user.created', created);
        return created;
      }, (err) => {
        throw new Error(`Error creating ${user.username}:, DiscorId: ${user.discordId}, error: ${err}`);
      });
    throw new Error(`Error creating ${user.username}:, DiscorId: ${user.discordId}`);
  }

  async update(user: User): Promise<User> {
    await this.userRepository
      .update(user)
      .then((updated) => {
        console.log(`${updated.username}, DiscorId: ${user.discordId} was Updated successfully`);
        this.eventEmitter.emit('user.updated', updated);
        return updated;
      }, (err) => {
        throw new Error(`Error updating ${user.username}:, DiscorId: ${user.discordId}, error: ${err}`);
      });
    throw new Error(`Error updating ${user.username}:, DiscorId: ${user.discordId}`);
  }

  async delete(user: User): Promise<void> {
    await this.userRepository.delete(user)
      .then(() => {
        console.log(`${user.username}, DiscorId: ${user.discordId} was deleted successfully`);
        this.eventEmitter.emit('user.deleted', user.username);
      }, (err) => {
        console.log(`Error deleting ${user.username}:, DiscorId: ${user.discordId}`);
        throw err;
      });
  }
}
