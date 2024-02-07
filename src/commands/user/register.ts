import { SlashCommandBuilder } from 'discord.js';
import UserService from '../../services/UserService';
import { UserRepository } from '../../data/repositories/UserRepository';
import { UserInterface } from '../../data/models/User';
import { Interaction } from '../../interfaces/discord/Interaction';
import { Replies } from '../../enums/discord/Replies';
import { SubCommands } from '../../enums/discord/SubCommands';


const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const xboxRegExp = /^Xbox_\d{16}$/;
const steamRegExp = /^765\d{14}$/;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Sign up to join one of our servers!')
    .addSubcommand(subcommand =>
      subcommand
        .setName(SubCommands.XBOX)
        .setDescription('For Xbox players')
        .addStringOption(option =>
          option.setName('xboxid')
            .setDescription('Your Xbox ID')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName(SubCommands.STEAM)
        .setDescription('For Steam players')
        .addStringOption(option =>
          option.setName('steam64id')
            .setDescription('Your 17 digit Steam64ID')
            .setRequired(true))),
  /**
 * This function executes the registration process for the bot.
 * It handles registration for both Xbox and Steam users.
 *
 * @param interaction - The interaction object from the Discord API.
 */
  async execute(interaction: Interaction) {
    // for xbox users
    const subCommand = interaction.options.getSubcommand();

    if (subCommand === SubCommands.XBOX) {
      console.log('XBOX');
      const xboxID = this.getInteractionOptionFrom('xboxid', interaction);
      if (xboxID && xboxRegExp.test(xboxID)) {
        await this.checkIfUserIsRegistered(interaction, xboxID, this.registerXboxUser);
        // await this.registerXboxUser(interaction, xboxID);
      } else {
        await this.reply(interaction, `${xboxID} ${Replies.XBOX_ID_INVALID_OR_MISSING}`);
      }
    }

    if (subCommand === SubCommands.STEAM) {
      console.log('STEAM');
      const steam64ID = this.getInteractionOptionFrom('steam64id', interaction);
      if (steam64ID && steamRegExp.test(steam64ID)) {
        await this.checkIfUserIsRegistered(interaction, steam64ID, this.registerSteamUser);
        // await this.registerSteamUser(interaction, steam64ID);
      } else {
        this.reply(interaction, `${steam64ID} ${Replies.STEAM_ID_INVALID_OR_MISSING}`);
      }
    }
  },
  getInteractionOptionFrom(key: string, interaction: Interaction): string {
    return interaction.options.getString(key);
  },
  async reply(interaction: Interaction, message: string): Promise<void> {
    await interaction.reply({ content: message, ephemeral: true });
  },
  async checkIfUserIsRegistered(interaction: Interaction, id: string,
    callback: (action: Interaction, accountId: string) => Promise<void>) {
    try {
      const isRegistered = await userService.findBy(interaction.user.id);
      if (isRegistered) {
        this.reply(interaction, `${Replies.ALREADY_REGISTERED} ${interaction.user.username}`);
      } else {
        callback(interaction, id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async registerXboxUser(interaction: Interaction, xboxId: string): Promise<void> {
    try {
      const user = { DiscordId: interaction.user.id, Username: interaction.user.username, XboxId: xboxId } as UserInterface;
      await userService.create(user);
      await this.reply(interaction, `${Replies.XBOX_REGISTERED} ${xboxId}.`);
    } catch (err) {
      console.log(err);
    }
  },
  async registerSteamUser(interaction: { options: { getSubcommand: () => string; getString: (arg0: string) => any; }; user: { id: any; username: any; }; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }, steam64ID: string): Promise<void> {
    try {
      const user = { DiscordId: interaction.user.id, Username: interaction.user.username, SteamId: steam64ID } as UserInterface;
      await userService.create(user);
      // await this.reply(interaction, `${Replies.STEAM_REGISTERED} ${steam64ID}`);
      await interaction.reply({ content: `Thank you for registering with the Steam ID ${steam64ID}`, ephemeral: true });
    } catch (err) {
      console.log(err);
    }
  },
};
