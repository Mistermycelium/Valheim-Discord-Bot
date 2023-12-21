// Require necessary classes
const fs = require('node:fs');
const { db } = require('./modules/utility/Database');
const { whitelist } = require('./modules/whitelist.js');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// initialize client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// dynamic acquisition of slash commands
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
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
client.once(Events.ClientReady, async readyClient => {
  await db.sync({ alter: true })
    .then(() => {
      console.log('Database & tables created!');
    })
    .catch((error) => {
      console.error('error: ', error);
    });
  await whitelist.loadData();
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

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
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
client.login(token);
