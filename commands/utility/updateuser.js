const { SlashCommandBuilder } = require('discord.js');
const { whitelist } = require('../../modules/whitelist');
const Validator = require('../../modules/utility/Validator');

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
  async execute(interaction) {
    try {
      const mentionable = interaction.options.getMentionable('user');
      const usr = {
        DiscordID: mentionable.user.id,
        Username: mentionable.user.username,
      };

      if (!await whitelist.findUser(usr.DiscordID)) {
        throw new Error(`User ${usr.Username} is not in the whitelist.`);
      }

      if (interaction.options.getString('xbox')) {
        const xboxID = interaction.options.getString('xbox');
        Validator.validateId(xboxID, /^Xbox_\d{16}$/, `${xboxID} is not a valid Xbox ID`);
        usr.XboxID = xboxID;
      }

      if (interaction.options.getString('steam')) {
        const steam64ID = interaction.options.getString('steam');
        Validator.validateId(steam64ID, /^765\d{14}$/, `${steam64ID} is not a valid Steam ID`);
        usr.SteamID = steam64ID;
      }

      await whitelist.updateUser(usr);
      await interaction.reply({ content: `${mentionable} updated`, ephemeral: true });
    } catch (error) {
      await interaction.reply({ content: `Failed: ${error.message}`, ephemeral: true });
    }
  },
};
