// import { SlashCommandBuilder } from 'discord.js';
// import { banlist } from '../../modules/banlist';
// import Validator from '../../modules/utility/Validator';

// module.exports = {
//   data:
//     new SlashCommandBuilder()
//     .setName('banuser')
//     .setDescription('Ban a user')
//     .addMentionableOption(option =>
//       option.setName('user')
//         .setRequired(true)
//         .setDescription('The User to add to the banlist')),
//   async execute(interaction: { options: { getMentionable: (arg0: string) => any; }; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
//     const mentionable = interaction.options.getMentionable('user');
//     const usr: { [key: string]: any } = {
//       DiscordID: mentionable.user.id,
//       Username: mentionable.user.username,
//     };
  
//     if

// };