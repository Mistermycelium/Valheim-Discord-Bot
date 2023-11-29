// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);




// import { REST, Routes } from 'discord.js';

// const commands = [
//   {
//     name: 'ping',
//     description: 'Replies with Pong!',
//   },
// ];

// const rest = new REST({ version: '10' }).setToken(TOKEN);

// try {
//   console.log('Started refreshing application (/) commands.');

//   await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

//   console.log('Successfully reloaded application (/) commands.');
// } catch (error) {
//   console.error(error);
// }

// import { Client, GatewayIntentBits } from 'discord.js';
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });

// client.login(TOKEN);


