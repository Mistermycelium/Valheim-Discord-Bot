import { SlashCommandBuilder } from 'discord.js';
import { whitelist } from '../../modules/whitelist';

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
    if (await whitelist.findUser(user.id)) {
      await whitelist.removeUser({ DiscordID: user.id });
      await interaction.reply({ content: `${user} removed.`, ephemeral: true });
    } else {
      await interaction.reply({ content: `Failed: ${user}`, ephemeral: true });
    }
  },
};
