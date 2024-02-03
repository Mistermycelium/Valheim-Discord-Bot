/* eslint-disable no-shadow */
import IRepository from '../data/repositories/IRepository';
import EventEmitter from 'events';
import { IService } from '../interfaces/IService';
import { UserInterface } from '../data/models/User';
// import { injectable } from 'inversify';

// @injectable()
export default class UserService implements IService<UserInterface> {
  private eventEmitter: EventEmitter;

  constructor(
    private userRepository: IRepository<UserInterface>) {
    this.userRepository = userRepository;
    this.eventEmitter = new EventEmitter();
  }

  public async findBy(discordId: string): Promise<UserInterface> {
    return await this.userRepository
      .findById(discordId)
      .then((user) => {
        if (user) {
          return user;
        } else {
          throw new Error(`User ${discordId} not found`);
        }
      }, (err) => {
        throw new Error(`An error occurred when searching for user with DiscordId: ${discordId} , error: ${err}`);
      });
  }

  async create(user: UserInterface): Promise<UserInterface> {
    return await this.userRepository
      .create(user)
      .then((created) => {
        if (created) {
          console.log(`${created.Username}, DiscorId: ${user.DiscordId} was created successfully`);
          this.eventEmitter.emit('user.created', created);
          return created;
        } else {
          throw new Error(`Error creating ${user.Username}:, DiscorId: ${user.DiscordId}`);
        }
      }, (err) => {
        throw new Error(`Error creating ${user.Username}:, DiscorId: ${user.DiscordId}, error: ${err}`);
      });
  }


  async update(user: UserInterface): Promise<UserInterface> {
    return await this.userRepository
      .update(user)
      .then((updated) => {
        console.log(`${updated.Username}, DiscorId: ${user.DiscordId} was Updated successfully`);
        this.eventEmitter.emit('user.updated', updated);
        return updated;
      }, (err) => {
        throw new Error(`Error updating ${user.Username}:, DiscorId: ${user.DiscordId}, error: ${err}`);
      });
  }

  async delete(user: UserInterface): Promise<void> {
    await this.userRepository.delete(user)
      .then(() => {
        console.log(`${user.Username}, DiscorId: ${user.DiscordId} was deleted successfully`);
        this.eventEmitter.emit('user.deleted', user.Username);
      }, (err) => {
        throw new Error(`Error deleting ${user.Username}:, DiscorId: ${user.DiscordId}, error: ${err}`);
      });
  }
}
