const { SlashCommandBuilder } = require('discord.js');
const imports = require('../../whitelist/import.json');
const { whitelist } = require('../../modules/whitelist');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('import')
    .setDescription('Sign up to join one of our servers!'),
  async execute(interaction) {
    await Promise.all(imports.map(async (user) => {
      try {
        await whitelist.addUser(user);
      } catch (error) {
        console.log(`Failed to add user ${user.Username}: ${error.message}`);
      }
    }));
    console.log('Imported');
    await interaction.reply({ content: 'Ooga Booga', ephemeral: true });
  },
};
