import { User, UserInterface } from '../../data/models/User';
import IRepository from '../../data/repositories/IRepository';
import { TransportMethod } from '../uploads/TransportMethod';
import { AbstractConfig } from '../../models/IUploadConfig';
import IListEntry from '../../models/IListEntry';
import IUserListService from '../IUserListService';
import { UserListType } from '../../models/UserListType';
import UserListBuilder from './UserListBuilder';
import EventEmitter from 'events';
import { ServerInterface } from '../../data/models/Server';
import { UserServerStatusInterface } from '../../data/models/UserServerStatus';

export default class UserListService implements IUserListService {
  eventEmitter: EventEmitter;

  constructor(private userRepository: IRepository<UserInterface,Boolean>,
    private serverRepository: IRepository<ServerInterface,Boolean>,
    private userServiceStatusRepository: IRepository<UserServerStatusInterface,Boolean>,
    private uploadService: TransportMethod<AbstractConfig>,
    private listBuilder: UserListBuilder,
    private userListType: UserListType) {
    this.eventEmitter = new EventEmitter();
  }

  async updateList(): Promise<string> {
    await this.listBuilder.buildList(this.userListType)
      .then((content) => {
        this.uploadService.upload(content);
      }, (err) => {
        throw new Error(`Error building ${this.userListType}: ${err}`);
      });
    throw new Error(`Error building ${this.userListType}`);
  }

  async exists(userEntry: IListEntry): Promise<boolean> {
    return await this.userRepository.findBy({ DiscordId: userEntry.DiscordId, StatusType: this.userListType })
      .then((user) => {
        if (user) {
          return true;
        }
        return false;
      }, (err) => { throw new Error(`Error finding user with discordId: ${userEntry.DiscordId} among the ${this.userListType}'ed users, error: ${err}`); });
  }

  async add(userEntry: IListEntry): Promise<void> {
    const server = await this.serverRepository.findBy({ ServerId: 0 });
    // ALL Servers
    const user = await this.userRepository.findById(userEntry.DiscordId) as User;

    if (!user || !server) {
      throw new Error('User or Server not found');
    }
    // Create a new UserServerStatus instance
    await this.userServiceStatusRepository.create({
      StatusType: this.userListType,
      UserId: user.Id,
      ServerId: 0,
    }).then(() => {
      console.log(`User ${userEntry.DiscordId} was added successfully to ${this.userListType} list.`);
    });
  }

  async update(userEntry: IListEntry): Promise<void> {
    const user = (await this.userRepository.findBy({ DiscordId: userEntry.DiscordId, StatusType: this.userListType })).find((usr) => usr.DiscordId === userEntry.DiscordId);
    if (user) {
      user.SteamId = userEntry.SteamId;
      user.XboxId = userEntry.XboxId;
      user.Username = userEntry.Username;
      await this.userRepository.update(user).then(() => {
        console.log(`User ${user.DiscordId} was updated successfully in ${this.userListType} list.`);
      });
    }
  }

  async remove(user: IListEntry): Promise<void> {
    await this.userRepository.delete({ DiscordId: user.DiscordId }).then(() => {
      console.log(`User ${user.DiscordId} was deleted successfully from ${this.userListType} list.`);
    }, (err) => { throw new Error(`Error deleting user with discordId: ${user.DiscordId}, error: ${err}`); },
    );
  }

  async load(): Promise<IListEntry[]> {
    return await this.userRepository.findBy({ userStatus: this.userListType })
      .then((users) => {
        if (users) {
          return users.map((user) => {
            return { DiscordId: user.DiscordId, Username: user.Username } as IListEntry;
          });
        } else {
          throw new Error(`No ${this.userListType}'ed users found`);
        }
      }, (err) => { throw new Error(`Error loading ${this.userListType}: ${err}`); });
  }
}
