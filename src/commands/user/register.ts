import { SlashCommandBuilder } from 'discord.js';
import UserService from '../../services/UserService';


module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Sign up to join one of our servers!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('xbox')
        .setDescription('For Xbox players')
        .addStringOption(option =>
          option.setName('xboxid')
            .setDescription('Your Xbox ID')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('steam')
        .setDescription('For Steam players')
        .addStringOption(option =>
          option.setName('steam64id')
            .setDescription('Your 17 digit Steam64ID')
            .setRequired(true))),
  /**
 * This function executes the registration process for the bot.
 * It handles registration for both Xbox and Steam users.
 *
 * @param interaction - The interaction object from the Discord API.
 */
  async execute(interaction: { options: { getSubcommand: () => string; getString: (arg0: string) => any; }; user: { id: any; username: any; }; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
    // for xbox users
    if (interaction.options.getSubcommand() === 'xbox') {
      const xboxID = interaction.options.getString('xboxid');
      const xboxRegExp = /^Xbox_\d{16}$/;
      if (xboxID && xboxRegExp.test(xboxID)) {
        if (await UserService.findBy(interaction.user.id)) {
          await interaction.reply({ content: `It looks like you're already registered ${interaction.user.username}`, ephemeral: true });
        } else {
          await UserService.addUser({ DiscordID: interaction.user.id, Username: interaction.user.username, XboxID: xboxID });
          // call function to manage record, check for existing record. if (record.exists)
          await interaction.reply({ content: `Thank you for registering with the XboxID ${xboxID}.`, ephemeral: true });
        }
      } else {
        // xboxID is missing or invalid. For now, we treat both the same.
        await interaction.reply({ content: `\`\`${xboxID}\`\` is not a valid Xbox ID, Xbox IDs should look like \`\`Xbox_25xxxxxxxxxxxxxx\`\``, ephemeral: true });
      }
      // for steam users
    } else if (interaction.options.getSubcommand() === 'steam') {
      const steam64ID = interaction.options.getString('steam64id');
      const steamRegExp = /^765\d{14}$/;
      if (steam64ID && steamRegExp.test(steam64ID)) {
        if (await UserService.findUser(interaction.user.id)) {
          await interaction.reply({ content: `It looks like you're already registered ${interaction.user.username}`, ephemeral: true });
        } else {
          await UserService.addUser({ DiscordID: interaction.user.id, Username: interaction.user.username, SteamID: steam64ID });
          await interaction.reply({ content: `Thank you for registering with the Steam ID ${steam64ID}`, ephemeral: true });
        }
      } else {
        // invalid or missing steam id
        await interaction.reply({ content: `${steam64ID} is not a valid Steam ID, steam IDs should look like 765xxxxxxxxxxxxxx`, ephemeral: true });
      }
    }
  },
};
