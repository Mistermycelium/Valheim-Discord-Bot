"use strict";
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
    async execute(interaction) {
        const mentionable = interaction.options.getMentionable('user');
        const usr = {
            DiscordID: mentionable.user.id,
            Username: mentionable.user.username,
        };
        // console.log(mentionable.user);
        if (await whitelist_1.whitelist.findUser(usr.DiscordID)) {
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
            await whitelist_1.whitelist.addUser(usr);
            await interaction.reply({ content: `${mentionable} added.`, ephemeral: true });
        }
        else {
            await interaction.reply({ content: `Failed to add ${mentionable}`, ephemeral: true });
        }
    },
};
