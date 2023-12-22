'use strict';
const __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const discord_js_1 = require('discord.js');
const config_json_1 = require('./config.json');
// guildID
const node_fs_1 = __importDefault(require('node:fs'));
const node_path_1 = __importDefault(require('node:path'));
const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = node_path_1.default.join(__dirname, 'commands');
const commandFolders = node_fs_1.default.readdirSync(foldersPath);
for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = node_path_1.default.join(foldersPath, folder);
  const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = node_path_1.default.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}
// Construct and prepare an instance of the REST module
const rest = new discord_js_1.REST().setToken(config_json_1.token);
// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      // Routes.applicationCommands(clientId),
      discord_js_1.Routes.applicationGuildCommands(config_json_1.clientId, config_json_1.guildId), { body: commands });
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
