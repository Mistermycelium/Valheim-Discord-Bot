const { SlashCommandBuilder } = require('discord.js');
const { whitelist } = require('../../modules/whitelist');

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
    const mentionable = interaction.options.getMentionable('user');
    const usr = {
      DiscordID: mentionable.user.id,
      Username: mentionable.user.username,
    };
    // console.log(mentionable.user);
    if (await whitelist.findUser(usr.DiscordID)) {
      if (interaction.options.getString('xbox')) {
        const xboxID = interaction.options.getString('xbox');
        const xboxRegExp = /^Xbox_\d{16}$/;
        if (!xboxRegExp.test(xboxID)) {
          await interaction.reply({ content: `${xboxID} is not a valid Xbox ID`, ephemeral: true });
          return;
        }
        usr.XboxID = xboxID;
      }
      if (interaction.options.getString('steam')) {
        const steam64ID = interaction.options.getString('steam');
        const steamRegExp = /^765\d{14}$/;
        if (!steamRegExp.test(steam64ID)) {
          await interaction.reply({ content: `${steam64ID} is not a valid Steam ID`, ephemeral: true });
          return;
        }
        usr.SteamID = steam64ID;
      }
      await whitelist.updateUser(usr);
      await interaction.reply({ content: `${mentionable} updated`, ephemeral: true });
    } else {
      await interaction.reply({ content: `Failed: ${mentionable}`, ephemeral: true });
    }
  },
};
