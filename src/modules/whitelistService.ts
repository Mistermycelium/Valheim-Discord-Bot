/* eslint-disable no-shadow */

import { UploadService } from '../services/UploadService';
import { AbstractConfig } from '../interfaces/IConfig';
import { User } from '../data/models/User';
import Repository from '../data/repositories/Repository';
import EventEmitter from 'events';
import { Mutex } from 'async-mutex';
import { UploadServiceFactory } from '../services/UploadServiceFactory';

class WhitelistService {
  // eslint-disable-next-line no-use-before-define
  private static instance: WhitelistService;
  private users: User[];
  private eventEmitter: EventEmitter;
  private mutex: Mutex;

  private constructor(private userRepository: Repository<User>,
    private uploadService: UploadService,
    private config: AbstractConfig) {
    this.users = [];
    this.userRepository = userRepository;
    this.uploadService = uploadService;
    this.eventEmitter = new EventEmitter();
    this.mutex = new Mutex();
  }

  public static async getInstance(userRepository: Repository<User>,
    config: AbstractConfig): Promise<WhitelistService> {
    if (!WhitelistService.instance) {
      const uploadService = UploadServiceFactory.create(config);
      WhitelistService.instance = new WhitelistService(userRepository, uploadService, config);
      await WhitelistService.instance.loadData();
    }
    return WhitelistService.instance;
  }

  private async loadData() {
    const release = await this.mutex.acquire();
    try {
      WhitelistService.instance.users = await this.userRepository.getAll();
      console.log('loaded all users');
    } finally {
      release();
    }
  }

  async create(user: any) {
    try {
      WhitelistService.instance.userRepository.create(user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async findBy(discordId: any) {
    const release = await this.mutex.acquire();
    try {
      await this.users.find((user: { DiscordID: any; }) => user.DiscordID === discordId);
    } finally {
      release();
    }
  }

  async update(user: User): Promise<User | Error> {
    await WhitelistService.instance.userRepository.update(user)
      .then((updated) => {
        if (updated instanceof User) {
          console.log(`${updated.Username}, DiscorId: ${user.DiscordID} was Updated successfully`);
        }
      });

    throw new Error(`Error updating ${user.Username}:, DiscorId: ${user.DiscordID}`);
  }

  async delete(user: User): Promise<void | Error> {
    WhitelistService.instance.userRepository.delete(user);
  }

  private buildWhitelist(users: Array<User>) {
    let content = '';
    // Build the whitelist content
    users.forEach((user: User) => {
      let userstr = '';
      if (user.SteamID) {
        userstr = `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.SteamID}\n\n`;
        if (user.XboxID) {
          userstr = userstr + `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.XboxID}\n\n`;
        }
      } else if (user.XboxID) {
        userstr = `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.XboxID}\n\n`;
      }
      content = content + userstr;
    });
    return content;
  }
}

export default WhitelistService;
