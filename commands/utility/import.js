const { SlashCommandBuilder } = require('discord.js');
const imports = require('../../whitelist/import.json');
const { whitelist } = require('../../modules/whitelist');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('import')
    .setDescription('Sign up to join one of our servers!'),
  async execute(interaction) {
    imports.forEach(user => {
      whitelist.addUser(user);
    });
    console.log('Imported');
    await interaction.reply({ content: 'Ooga Booga', ephemeral: true });
  },
};
