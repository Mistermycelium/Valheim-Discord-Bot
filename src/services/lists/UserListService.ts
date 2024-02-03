import { UserInterface } from '../../data/models/User';
import IRepository from '../../data/repositories/IRepository';
import { TransportMethod } from '../../interfaces/TransportMethod';
import { AbstractConfig } from '../../models/IConfig';
import IListEntry from '../../models/IListEntry';
import IUserListService from '../../interfaces/IUserListService';
import { UserListType } from '../../models/UserListType';
import UserListBuilder from './UserListBuilder';
import EventEmitter from 'events';

export default class UserListService implements IUserListService {
  eventEmitter: EventEmitter;

  constructor(private userRepository: IRepository<UserInterface>,
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
        throw new Error(`Error building whitelist: ${err}`);
      });
    throw new Error('Error building whitelist');
  }

  async exists(user: IListEntry): Promise<boolean> {
    return await this.userRepository.findById(user.DiscordId)
      .then((usr) => {
        if (usr) {
          return true;
        }
        return false;
      }, (err) => { throw new Error(`Error finding user with discordId: ${user.DiscordId}, error: ${err}`); });
  }

  async add(user: IListEntry): Promise<void> {
    const newUser: UserInterface = {
      DiscordId: user.DiscordId,
      Username: user.Username,

    } as UserInterface;
    await this.userRepository.create(newUser);
  }

  async remove(user: IListEntry): Promise<void> {
    await this.userRepository.delete(user).then(() => {
      console.log(`User ${user.DiscordId} was deleted successfully`);
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
          throw new Error('No users found');
        }
      }, (err) => { throw new Error(`Error loading whitelist: ${err}`); });
  }
}
