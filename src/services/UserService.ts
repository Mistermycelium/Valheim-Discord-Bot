/* eslint-disable no-shadow */
import { injectable } from 'inversify';
import IRepository from '../data/repositories/IRepository';
import EventEmitter from 'events';
import { Mutex } from 'async-mutex';
import { IService } from '../interfaces/IService';
import { User } from '../data/models/User';

@injectable()
export default class UserService implements IService<User> {
  private eventEmitter: EventEmitter;
  private mutex: Mutex;

  constructor(
    private userRepository: IRepository<User>) {
    this.userRepository = userRepository;
    this.eventEmitter = new EventEmitter();
    this.mutex = new Mutex();
  }

  public async findBy(discordId: string): Promise<User> {
    await this.userRepository
      .findById(discordId)
      .then((user) => {
        if (user) {
          return user;
        }
      });
    throw new Error(`User ${discordId} not found`);
  }

  async create(user: User): Promise<User> {
    await this.userRepository
      .create(user)
      .then((created) => {
        if (created) {
          console.log(`${created.username}, DiscorId: ${user.discordId} was created successfully`);
          return created;
        }
      });

    throw new Error(`Error creating ${user.username}:, DiscorId: ${user.discordId}`);
  }

  async update(user: User): Promise<User> {
    await this.userRepository
      .update(user)
      .then((updated) => {
        if (updated instanceof User) {
          console.log(`${updated.username}, DiscorId: ${user.discordId} was Updated successfully`);
        }
      });

    throw new Error(`Error updating ${user.username}:, DiscorId: ${user.discordId}`);
  }

  async delete(user: User): Promise<void> {
    await this.userRepository.delete(user);
  }
}
