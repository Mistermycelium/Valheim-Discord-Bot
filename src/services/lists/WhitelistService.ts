import { User } from '../../data/models/User';
import IRepository from '../../data/repositories/IRepository';
import { IService } from '../../interfaces/IService';
import IListEntry from '../../interfaces/models/IListEntry';
import UserListCreator from '../../listCreators/UserListCreator';
import { UserListType } from '../../listCreators/UserListType';

export default class WhitelistService extends UserListCreator {
  constructor(private userRepository: IRepository<User>,
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
