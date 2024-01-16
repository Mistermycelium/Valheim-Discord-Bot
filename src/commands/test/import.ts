import { SlashCommandBuilder } from 'discord.js';
import imports from '../../../config/whitelist/import.json';
import WhitelistService from '../../services/lists/WhitelistService';
import { UserRepository } from '../../data/repositories/UserRepository';
import { FileUploadService } from '../../services/uploads/FileUploadService';
import { FileSystemServiceConfig } from '../../interfaces/models/IConfig';
import config from '../../../config/config.json';
import IListEntry from '../../interfaces/models/IListEntry';

const fileSystemConfig: FileSystemServiceConfig = config.beeheimVanillaAdminListFileSystem;
const whitelistService = new WhitelistService(new UserRepository(), new FileUploadService(fileSystemConfig));


module.exports = {
  data: new SlashCommandBuilder()
    .setName('import')
    .setDescription('Sign up to join one of our servers!'),
  async execute(interaction: { reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
    await Promise.all(imports.map(async (user: IListEntry) => {
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
