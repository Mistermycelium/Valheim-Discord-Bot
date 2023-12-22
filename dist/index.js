'use strict';
const __createBinding = (this && this.__createBinding) || (Object.create
  ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    let desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
  }
  : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create
  ? function(o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v });
  }
  : function(o, v) {
    o.default = v;
  });
const __importStar = (this && this.__importStar) || function(mod) {
  if (mod && mod.__esModule) return mod;
  const result = {};
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
const __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
// Require necessary classes
const fs = __importStar(require('fs'));
const Database_1 = require('./modules/utility/Database');
const whitelist_1 = require('./modules/whitelist');
const path_1 = __importDefault(require('path'));
const discord_js_1 = require('discord.js');
const config_json_1 = require('./config.json');
// initialize client
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
client.commands = new discord_js_1.Collection();
const foldersPath = path_1.default.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
// dynamic acquisition of slash commands
for (const folder of commandFolders) {
  const commandsPath = path_1.default.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path_1.default.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(discord_js_1.Events.ClientReady, async (readyClient) => {
  await Database_1.db.sync({ alter: true })
    .then(() => {
      console.log('Database & tables created!');
    })
    .catch((error) => {
      console.error('error: ', error);
    });
  await whitelist_1.whitelist.loadData();
  fs.writeFile('./whitelist/whitelist.txt', '', { flag: 'wx' }, (err) => {
    if (err) {
      console.log('whitelist found');
    } else {
      console.log('whitelist created');
    }
  });
  const configstring = `{
    "token": "token",
    "clientId": "clientId",
    "guildId": "guildId",
    "ftplogins": [
        {
            "host": "host",
            "port": "port",
            "user": "user",
            "password": "password"
        }
    ]
}`;
  fs.writeFile('./config.json', configstring, { flag: 'wx' }, (err) => {
    if (err) {
      console.log('config found');
    } else {
      console.log('config created');
    }
  });
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) { return; }
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});
// Log in to Discord with your client's token
client.login(config_json_1.token);
