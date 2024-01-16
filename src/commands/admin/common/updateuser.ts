import { SlashCommandBuilder } from 'discord.js';
import Validator from '../../../modules/utility/Validator';
import UserService from '../../../services/UserService';
import { UserRepository } from '../../../data/repositories/UserRepository';
import { User } from '../../../data/models/User';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

// Updates users already in the database. Requires permissions to use.
// For now, set roles manually within Discord.

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName('updateuser')
      .setDefaultMemberPermissions(0)
      .setDescription('Update a user')
      .addMentionableOption(option =>
        option.setName('user')
          .setRequired(true)
          .setDescription('The User to update from the whitelist'))
      .addStringOption(option =>
        option.setName('steam')
          .setRequired(false)
          .setDescription('The users Steam ID'))
      .addStringOption(option =>
        option.setName('xbox')
          .setRequired(false)
          .setDescription('The users Xbox ID')),
  async execute(interaction: { options: { getMentionable: (arg0: string) => any; getString: (arg0: string) => any; }; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
    try {
      const mentionable = interaction.options.getMentionable('user');
      const user: User = await userService.findBy(mentionable.user.id);

      if (!await userService.findBy(user.discordId)) {
        throw new Error(`User ${user.username} is not in the whitelist.`);
      }

      if (interaction.options.getString('xbox')) {
        const xboxID = interaction.options.getString('xbox');
        Validator.validateId(xboxID, /^Xbox_\d{16}$/, `${xboxID} is not a valid Xbox ID`);
        user.xboxId = xboxID;
      }

      if (interaction.options.getString('steam')) {
        const steam64ID = interaction.options.getString('steam');
        Validator.validateId(steam64ID, /^765\d{14}$/, `${steam64ID} is not a valid Steam ID`);
        user.steamId = steam64ID;
      }

      await userService.update(user);
      await interaction.reply({ content: `${mentionable} updated`, ephemeral: true });
    } catch (error) {
      if (error instanceof Error) {
        await interaction.reply({ content: `Failed: ${error.message}`, ephemeral: true });
      }
    }
  },
};
