import { User } from '../../data/models/User';
import { IService } from '../../interfaces/IService';
import IListEntry from '../../interfaces/models/IListEntry';
import UserListCreator from '../../listCreators/UserListCreator';
import { UserListType } from '../../listCreators/UserListType';
import UserService from '../UserService';

export default class WhitelistService extends UserListCreator {
  constructor(private userService: IService<User>,
    private fileUploadService: IService<string>) {
    super(UserListType.WHITELIST);
  }

  load(): IListEntry[] {
    throw new Error('Method not implemented.');
  }

  exists(discordId: string): boolean {
    throw new Error('Method not implemented.');
  }

  add(discordId: string): void {
    throw new Error('Method not implemented.');
  }

  remove(discordId: string): void {
    throw new Error('Method not implemented.');
  }

  async build() {
    console.log('Building whitelist');
    await this.; //TODO fix the load of data from the whitelist on the server - Also add sync of file or diff from database.
    try {
      await g.promises.writeFile('../config/whitelist/whitelist.txt', '', { flag: 'wx' });
      console.log('whitelist created');
    } catch (err) {
      console.log('whitelist found');
    }
  }
}
