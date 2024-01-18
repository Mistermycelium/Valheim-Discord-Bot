import { UserInterface } from '../../data/models/User';
import UserListType from '../../models/UserListType';
import { UserRepository } from '../../data/repositories/UserRepository';
export default class UserListBuilder {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async buildList(listType: UserListType): Promise<string> {
    console.log('Building whitelist');
    const whitelist: Array<UserInterface> = await this.userRepository.findBy({ userStatus: listType });
    let content = '';
    whitelist.forEach((user: UserInterface) => {
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
