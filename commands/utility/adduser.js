const { SlashCommandBuilder } = require('discord.js');
const { whitelist } = require('../../modules/whitelist');
const Validator = require('../../modules/utility/Validator');

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
  async execute(interaction) {
    const mentionable = interaction.options.getMentionable('user');
    const usr = {
      DiscordID: mentionable.user.id,
      Username: mentionable.user.username,
    };
    // console.log(mentionable.user);
    if (await whitelist.findUser(usr.DiscordID)) {
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
      await whitelist.addUser(usr);
      await interaction.reply({ content: `${mentionable} added.`, ephemeral: true });
    } else {
      await interaction.reply({ content: `Failed to add ${mentionable}`, ephemeral: true });
    }
  },
};

