"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const whitelist_1 = require("../../modules/whitelist");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('removeuser')
        .setDefaultMemberPermissions(0)
        .setDescription('Remove a user')
        .addMentionableOption(option => option.setName('user')
        .setRequired(true)
        .setDescription('The User to remove from the whitelist')),
    async execute(interaction) {
        const user = interaction.options.getMentionable('user');
        if (await whitelist_1.whitelist.findUser(user.id)) {
            await whitelist_1.whitelist.removeUser({ DiscordID: user.id });
            await interaction.reply({ content: `${user.id}`, ephemeral: true });
        }
        else {
            await interaction.reply({ content: `Failed: ${user}`, ephemeral: true });
        }
    },
};
