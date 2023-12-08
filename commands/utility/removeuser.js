const { SlashCommandBuilder } = require('discord.js');
const { whitelist } = require('../../modules/whitelist');

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
  async execute(interaction) {
    const user = interaction.options.getMentionable('user');
    if (await whitelist.findUser(user.id)) {
      await whitelist.removeUser({ DiscordID: user.id });
      await interaction.reply({ content: `${user.id}`, ephemeral: true });
    } else {
      await interaction.reply({ content: `Failed: ${user}`, ephemeral: true });
    }
  },
};
