"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const import_json_1 = __importDefault(require("../../whitelist/import.json"));
const whitelist_1 = require("../../modules/whitelist");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('import')
        .setDescription('Sign up to join one of our servers!'),
    async execute(interaction) {
        await Promise.all(import_json_1.default.map(async (user) => {
            try {
                await whitelist_1.whitelist.addUser(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(`Failed to add user ${user.Username}: ${error.message}`);
                }
            }
        }));
        console.log('Imported');
        await interaction.reply({ content: 'Ooga Booga', ephemeral: true });
    },
};
