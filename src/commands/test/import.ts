import { SlashCommandBuilder } from 'discord.js';
import imports from '../../../config/whitelist/import.json';
import UserListService from '../../services/lists/UserListService';
import { UserRepository } from '../../data/repositories/UserRepository';
import { FileUploadService } from '../../services/uploads/FileUploadService';
import { FileSystemServiceConfig } from '../../models/IConfig';
import config from '../../../config/config.json';
import IListEntry from '../../models/IListEntry';
import UserListBuilder from '../../services/lists/UserListBuilder';
import UserListType from '../../models/UserListType';

const fileSystemConfig: FileSystemServiceConfig = config.beeheimVanillaAdminListFileSystem;
const userRepository = new UserRepository();
// TODO be aware that it only currently imports the whitelist
const whitelistService = new UserListService(userRepository, new FileUploadService(fileSystemConfig), new UserListBuilder(userRepository), UserListType.WHITELIST);


module.exports = {
  data: new SlashCommandBuilder()
    .setName('import')
    .setDescription('Sign up to join one of our servers!'),
  async execute(interaction: { reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
    await Promise.all(imports.map(async (user: any) => {
      try {
        await whitelistService.add(user);
      } catch (error) {
        if (error instanceof Error) {
          console.log(`Failed to add user ${user.username}: ${error.message}`);
        }
      }
    }));
    console.log('Imported');
    await interaction.reply({ content: 'Ooga Booga', ephemeral: true });
  },
};
