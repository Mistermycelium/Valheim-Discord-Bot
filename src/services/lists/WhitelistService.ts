import { User } from '../../data/models/User';
import IRepository from '../../data/repositories/IRepository';
import { TransportMethod } from '../../interfaces/TransportMethod';
import { FileSystemConfig } from '../../interfaces/models/IConfig';
import IListEntry from '../../interfaces/models/IListEntry';
import UserListCreator from '../../listCreators/UserListCreator';
import { UserListType } from '../../listCreators/UserListType';

export default class WhitelistService extends UserListCreator {
  constructor(private userRepository: IRepository<User>,
    private fileUploadService: TransportMethod<FileSystemConfig>) {
    super(UserListType.WHITELIST);
  }

  exists(user: IListEntry): boolean {
    throw new Error('Method not implemented.');
  }

  add(user: IListEntry): void {
    throw new Error('Method not implemented.');
  }

  remove(user: IListEntry): void {
    throw new Error('Method not implemented.');
  }

  load(): IListEntry[] {
    throw new Error('Method not implemented.');
  }

  async buildList(serverName: string): Promise<string> {
    console.log('Building whitelist');
    const whitelist = await this.userRepository.findBy({ name: serverName });
    let content = '';
    whitelist.forEach(user => {
      let userstr = '';
      if (user.steamId) {
        userstr = `// Discord ID: ${user.discordId} Username: ${user.username}\n${user.username}\n\n`;
        if (user.xboxId) {
          userstr = userstr + `// Discord ID: ${user.discordId} Username: ${user.username}\n${user.xboxId}\n\n`;
        }
      } else if (user.xboxId) {
        userstr = `// Discord ID: ${user.discordId} Username: ${user.username}\n${user.xboxId}\n\n`;
      }
      content = content + userstr;
    });
    return content;
  }
}
