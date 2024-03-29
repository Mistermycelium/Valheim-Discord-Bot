import { Client, Collection, Interaction } from 'discord.js';
import { dbContext } from '../data/Database';
import fs from 'fs';
import { handleInteractionError } from './errorHandlers';

class BotClient extends Client {
  commands!: Collection<string, any>;
}

export async function handleReadyEvent(readyClient: Client<true>) {
  await syncDatabase();
  // TODO Load whitelist Entries before firing the event await WhitelistService.load();
  await createConfigFile();
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
}

async function syncDatabase() {
  try {
    await dbContext.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('error: ', error);
  }
}

async function createConfigFile() {
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

  try {
    await fs.promises.writeFile('./config/config.json', configstring, { flag: 'wx' });
    console.log('config created');
  } catch (err) {
    console.log('config found');
  }
}

export async function handleInteractionCreate(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  const command = (interaction.client as BotClient).commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    await handleInteractionError(interaction, error as Error);
  }
}
