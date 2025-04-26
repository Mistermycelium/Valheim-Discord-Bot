/* eslint-disable no-shadow */
import IRepository from '../data/repositories/IRepository';
import EventEmitter from 'events';
import { IService } from './IService';
import { UserInterface } from '../data/models/User';
// import { injectable } from 'inversify';

// @injectable()
export default class UserService implements IService<UserInterface,Boolean> {
  private eventEmitter: EventEmitter;

  constructor(
    private userRepository: IRepository<UserInterface,Boolean>) {
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

  async create(user: UserInterface): Promise<UserInterface|Boolean> {
    return await this.userRepository
      .create(user)
      .then((result) => {
        if (result) {
          console.log(`${user.Username}, DiscordId: ${user.DiscordId} was created successfully`);
          this.eventEmitter.emit('user.created', result);
          return result;
        } else {
          return false;
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
    await this.userRepository.delete({ DiscordId: user.DiscordId })
      .then(() => {
        console.log(`${user.Username}, DiscordId: ${user.DiscordId} was deleted successfully`);
        this.eventEmitter.emit('user.deleted', user.Username);
      }, (err) => {
        throw new Error(`Error deleting ${user.Username}:, DiscorId: ${user.DiscordId}, error: ${err}`);
      });
  }
}
