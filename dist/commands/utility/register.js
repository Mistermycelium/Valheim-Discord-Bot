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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const whitelist_1 = require("../../modules/whitelist");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('register')
        .setDescription('Sign up to join one of our servers!')
        .addSubcommand(subcommand => subcommand
        .setName('xbox')
        .setDescription('For Xbox players')
        .addStringOption(option => option.setName('xboxid')
        .setDescription('Your Xbox ID')
        .setRequired(true)))
        .addSubcommand(subcommand => subcommand
        .setName('steam')
        .setDescription('For Steam players')
        .addStringOption(option => option.setName('steam64id')
        .setDescription('Your 17 digit Steam64ID')
        .setRequired(true))),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // for xbox users
            if (interaction.options.getSubcommand() === 'xbox') {
                const xboxID = interaction.options.getString('xboxid');
                const xboxRegExp = /^Xbox_\d{16}$/;
                if (xboxID && xboxRegExp.test(xboxID)) {
                    if (yield whitelist_1.whitelist.findUser(interaction.user.id)) {
                        yield interaction.reply({ content: `It looks like you're already registered ${interaction.user.username}`, ephemeral: true });
                    }
                    else {
                        yield whitelist_1.whitelist.addUser({ DiscordID: interaction.user.id, Username: interaction.user.username, XboxID: xboxID });
                        // call function to manage record, check for existing record. if (record.exists)
                        yield interaction.reply({ content: `Thank you for registering with the XboxID ${xboxID}.`, ephemeral: true });
                    }
                }
                else {
                    // xboxID is missing or invalid. For now, we treat both the same.
                    yield interaction.reply({ content: `\`\`${xboxID}\`\` is not a valid Xbox ID, Xbox IDs should look like \`\`Xbox_25xxxxxxxxxxxxxx\`\``, ephemeral: true });
                }
                // for steam users
            }
            else if (interaction.options.getSubcommand() === 'steam') {
                const steam64ID = interaction.options.getString('steam64id');
                const steamRegExp = /^765\d{14}$/;
                if (steam64ID && steamRegExp.test(steam64ID)) {
                    if (yield whitelist_1.whitelist.findUser(interaction.user.id)) {
                        yield interaction.reply({ content: `It looks like you're already registered ${interaction.user.username}`, ephemeral: true });
                    }
                    else {
                        yield whitelist_1.whitelist.addUser({ DiscordID: interaction.user.id, Username: interaction.user.username, SteamID: steam64ID });
                        yield interaction.reply({ content: `Thank you for registering with the Steam ID ${steam64ID}`, ephemeral: true });
                    }
                }
                else {
                    // invalid or missing steam id
                    yield interaction.reply({ content: `${steam64ID} is not a valid Steam ID, steam IDs should look like 765xxxxxxxxxxxxxx`, ephemeral: true });
                }
            }
        });
    },
};
