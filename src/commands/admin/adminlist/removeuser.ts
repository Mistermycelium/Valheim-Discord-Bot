import { SlashCommandBuilder } from 'discord.js';
import UserListService from '../../../services/lists/UserListService';
import { UserRepository } from '../../../data/repositories/UserRepository';
import { FileUploadService } from '../../../services/uploads/FileUploadService';
import { FileSystemServiceConfig } from '../../../models/IUploadConfig';
import uploadConfig from '../../../../config/uploadConfig.json';
import UserListBuilder from '../../../services/lists/UserListBuilder';
import UserListType from '../../../models/UserListType';
import { Interaction } from '../../../interfaces/discord/Interaction';
import { ServerRepository } from '../../../data/repositories/ServerRepository';
import { UserServerStatusRepository } from '../../../data/repositories/UserServerStatusRepository';

const fileSystemConfig: FileSystemServiceConfig = uploadConfig.vanillaAdminListFileSystem;
const userRepository = new UserRepository();
const serverRepository = new ServerRepository();
const userStatusRepository = new UserServerStatusRepository();
const adminlistService = new UserListService(userRepository, serverRepository, userStatusRepository, new FileUploadService(fileSystemConfig),
  new UserListBuilder(userRepository), UserListType.ADMINLIST);

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName('demotefromadmin')
      .setDefaultMemberPermissions(0)
      .setDescription('Removes a user from the adminlist')
      .addMentionableOption(option =>
        option.setName('user')
          .setRequired(true)
          .setDescription('The User to remove from the adminlist')),
  async execute(interaction: Interaction) {
    const user = interaction.options.getMentionable('user');
    if (await adminlistService.exists(user)) {
      adminlistService.remove(user);
      await interaction.reply({ content: `${user} removed.`, ephemeral: true });
    } else {
      await interaction.reply({ content: `Failed: ${user}`, ephemeral: true });
    }
  },
};
