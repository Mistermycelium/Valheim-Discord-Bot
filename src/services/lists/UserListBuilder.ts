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
      if (user.SteamId) {
        userstr = `// Discord ID: ${user.DiscordId} Username: ${user.Username}\n${user.Username}\n\n`;
        if (user.XboxId) {
          userstr = userstr + `// Discord ID: ${user.DiscordId} Username: ${user.Username}\n${user.XboxId}\n\n`;
        }
      } else if (user.XboxId) {
        userstr = `// Discord ID: ${user.DiscordId} Username: ${user.Username}\n${user.XboxId}\n\n`;
      }
      content = content + userstr;
    });
    return content;
  }
}
