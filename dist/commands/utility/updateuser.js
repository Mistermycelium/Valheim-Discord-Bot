"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const whitelist_1 = require("../../modules/whitelist");
const Validator_1 = __importDefault(require("../../modules/utility/Validator"));
// Updates users already in the database. Requires permissions to use.
// For now, set roles manually within Discord.
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('updateuser')
        .setDefaultMemberPermissions(0)
        .setDescription('Update a user')
        .addMentionableOption(option => option.setName('user')
        .setRequired(true)
        .setDescription('The User to update from the whitelist'))
        .addStringOption(option => option.setName('steam')
        .setRequired(false)
        .setDescription('The users Steam ID'))
        .addStringOption(option => option.setName('xbox')
        .setRequired(false)
        .setDescription('The users Xbox ID')),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentionable = interaction.options.getMentionable('user');
                let usr = {
                    DiscordID: mentionable.user.id,
                    Username: mentionable.user.username,
                };
                if (!(yield whitelist_1.whitelist.findUser(usr.DiscordID))) {
                    throw new Error(`User ${usr.Username} is not in the whitelist.`);
                }
                if (interaction.options.getString('xbox')) {
                    const xboxID = interaction.options.getString('xbox');
                    Validator_1.default.validateId(xboxID, /^Xbox_\d{16}$/, `${xboxID} is not a valid Xbox ID`);
                    usr.XboxID = xboxID;
                }
                if (interaction.options.getString('steam')) {
                    const steam64ID = interaction.options.getString('steam');
                    Validator_1.default.validateId(steam64ID, /^765\d{14}$/, `${steam64ID} is not a valid Steam ID`);
                    usr.SteamID = steam64ID;
                }
                yield whitelist_1.whitelist.updateUser(usr);
                yield interaction.reply({ content: `${mentionable} updated`, ephemeral: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    yield interaction.reply({ content: `Failed: ${error.message}`, ephemeral: true });
                }
            }
        });
    },
};
