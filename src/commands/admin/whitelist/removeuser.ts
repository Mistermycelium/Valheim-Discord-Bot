import { SlashCommandBuilder } from 'discord.js';
import UserListService from '../../../services/lists/UserListService';
import { UserRepository } from '../../../data/repositories/UserRepository';
import { FileUploadService } from '../../../services/uploads/FileUploadService';
import { FileSystemServiceConfig } from '../../../models/IConfig';
import config from '../../../../config/config.json';
import UserListBuilder from '../../../services/lists/UserListBuilder';
import UserListType from '../../../models/UserListType';

const fileSystemConfig: FileSystemServiceConfig = config.beeheimVanillaAdminListFileSystem;
const userRepository = new UserRepository();
const whitelistService = new UserListService(userRepository, new FileUploadService(fileSystemConfig),
 new UserListBuilder(userRepository), UserListType.WHITELIST);

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName('removeuser')
      .setDefaultMemberPermissions(0)
      .setDescription('Remove a user')
      .addMentionableOption(option =>
        option.setName('user')
          .setRequired(true)
          .setDescription('The User to remove from the whitelist')),
  async execute(interaction: { options: { getMentionable: (arg0: string) => any; }; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
    const user = interaction.options.getMentionable('user');
    if (await whitelistService.exists(user)) {
      whitelistService.remove(user);
      await interaction.reply({ content: `${user} removed.`, ephemeral: true });
    } else {
      await interaction.reply({ content: `Failed: ${user}`, ephemeral: true });
    }
  },
};
