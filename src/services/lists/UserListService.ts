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
    await this.userRepository.findById(user.discordId)
      .then((usr) => {
        if (usr) {
          return true;
        }
        return false;
      }, (err) => { throw new Error(`Error finding user with discordId: ${user.discordId}, error: ${err}`); });
    throw new Error(`Error finding user with discordId: ${user.discordId}`);
  }

  async add(user: IListEntry): Promise<void> {
    const newUser: UserInterface = {
      discordId: user.discordId,
      username: user.username,

    } as UserInterface;
    await this.userRepository.create(newUser);
  }

  async remove(user: IListEntry): Promise<void> {
    await this.userRepository.delete(user).then(() => {
      console.log(`User ${user.discordId} was deleted successfully`);
    }, (err) => { throw new Error(`Error deleting user with discordId: ${user.discordId}, error: ${err}`); },
    );
  }

  async load(): Promise<IListEntry[]> {
    await this.userRepository.findBy({ userStatus: this.userListType })
      .then((users) => {
        return users;
      }, (err) => { throw new Error(`Error loading whitelist: ${err}`); });
    throw new Error('Error loading whitelist');
  }
}
