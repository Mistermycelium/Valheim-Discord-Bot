import { SlashCommandBuilder } from 'discord.js';
import Validator from '../../../modules/utility/Validator';
import UserListService from '../../../services/lists/UserListService';
import { UserRepository } from '../../../data/repositories/UserRepository';
import { FileUploadService } from '../../../services/uploads/FileUploadService';
import { FileSystemServiceConfig } from '../../../models/IConfig';
import config from '../../../../config/config.json';
import UserService from '../../../services/UserService';
import IListEntry from '../../../models/IListEntry';
import UserListBuilder from '../../../services/lists/UserListBuilder';
import { UserListType } from '../../../models/UserListType';

const fileSystemConfig: FileSystemServiceConfig = config.beeheimVanillaAdminListFileSystem;
const userRepository = new UserRepository();
const whitelistService = new UserListService(userRepository, new FileUploadService(fileSystemConfig),
  new UserListBuilder(userRepository), UserListType.WHITELIST);
const userService = new UserService(userRepository);

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName('adduser')
      .setDefaultMemberPermissions(0)
      .setDescription('Add a user')
      .addMentionableOption(option =>
        option.setName('user')
          .setRequired(true)
          .setDescription('The User to add to the whitelist'))
      .addStringOption(option =>
        option.setName('steam')
          .setRequired(false)
          .setDescription('The users Steam ID'))
      .addStringOption(option =>
        option.setName('xbox')
          .setRequired(false)
          .setDescription('The users Xbox ID')),
  async execute(interaction: { options: { getMentionable: (arg0: string) => any; getString: (arg0: string) => any; }; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
    const mentionable = interaction.options.getMentionable('user');
    const user: IListEntry = await userService.findBy(mentionable.user.id)
      .then((usr) => {
        return usr as IListEntry;
      });

    // console.log(mentionable.user);
    if (await whitelistService.exists(user)) {
      await interaction.reply({ content: `${mentionable} is already registered, try update instead.`, ephemeral: true });
    } else {
      if (interaction.options.getString('xbox')) {
        const xboxID = interaction.options.getString('xbox');
        Validator.validateId(xboxID, /^Xbox_\d{16}$/, `${xboxID} is not a valid Xbox ID`);
        user.XboxId = xboxID;
      }

      if (interaction.options.getString('steam')) {
        const steam64ID = interaction.options.getString('steam');
        try {
          Validator.validateId(steam64ID, /^765\d{14}$/, `${steam64ID} is not a valid Steam ID`);
        } catch (error) {
          if (error instanceof Error) {
            await interaction.reply({ content: `Error: ${error.message}`, ephemeral: true });
          }
        }
        user.SteamId = steam64ID;
      }
      whitelistService.add(user);
      await interaction.reply({ content: `${mentionable} added.`, ephemeral: true });
    }
  },
};

