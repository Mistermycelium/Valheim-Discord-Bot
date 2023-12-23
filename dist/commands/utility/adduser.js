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
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('adduser')
        .setDefaultMemberPermissions(0)
        .setDescription('Add a user')
        .addMentionableOption(option => option.setName('user')
        .setRequired(true)
        .setDescription('The User to add to the whitelist'))
        .addStringOption(option => option.setName('steam')
        .setRequired(false)
        .setDescription('The users Steam ID'))
        .addStringOption(option => option.setName('xbox')
        .setRequired(false)
        .setDescription('The users Xbox ID')),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const mentionable = interaction.options.getMentionable('user');
            let usr = {
                DiscordID: mentionable.user.id,
                Username: mentionable.user.username,
            };
            // console.log(mentionable.user);
            if (yield whitelist_1.whitelist.findUser(usr.DiscordID)) {
                yield interaction.reply({ content: `${mentionable} is already registered, try update instead.`, ephemeral: true });
            }
            else {
                if (interaction.options.getString('xbox')) {
                    const xboxID = interaction.options.getString('xbox');
                    Validator_1.default.validateId(xboxID, /^Xbox_\d{16}$/, `${xboxID} is not a valid Xbox ID`);
                    usr.XboxID = xboxID;
                }
                if (interaction.options.getString('steam')) {
                    const steam64ID = interaction.options.getString('steam');
                    try {
                        Validator_1.default.validateId(steam64ID, /^765\d{14}$/, `${steam64ID} is not a valid Steam ID`);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            yield interaction.reply({ content: `Error: ${error.message}`, ephemeral: true });
                        }
                    }
                    usr.SteamID = steam64ID;
                }
                yield whitelist_1.whitelist.addUser(usr);
                yield interaction.reply({ content: `${mentionable} added.`, ephemeral: true });
            }
        });
    },
};
