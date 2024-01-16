import { SlashCommandBuilder } from 'discord.js';
import WhitelistService from '../../../services/lists/WhitelistService';
import { UserRepository } from '../../../data/repositories/UserRepository';
import { FileUploadService } from '../../../services/uploads/FileUploadService';
import { FileSystemServiceConfig } from '../../../interfaces/models/IConfig';
import config from '../../../../config/config.json';

const fileSystemConfig: FileSystemServiceConfig = config.beeheimVanillaAdminListFileSystem;
const whitelistService = new WhitelistService(new UserRepository(), new FileUploadService(fileSystemConfig));

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
      await whitelistService.remove(user);
      await interaction.reply({ content: `${user} removed.`, ephemeral: true });
    } else {
      await interaction.reply({ content: `Failed: ${user}`, ephemeral: true });
    }
  },
};
