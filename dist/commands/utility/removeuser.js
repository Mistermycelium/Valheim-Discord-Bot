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
        .setName('removeuser')
        .setDefaultMemberPermissions(0)
        .setDescription('Remove a user')
        .addMentionableOption(option => option.setName('user')
        .setRequired(true)
        .setDescription('The User to remove from the whitelist')),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = interaction.options.getMentionable('user');
            if (yield whitelist_1.whitelist.findUser(user.id)) {
                yield whitelist_1.whitelist.removeUser({ DiscordID: user.id });
                yield interaction.reply({ content: `${user} removed.`, ephemeral: true });
            }
            else {
                yield interaction.reply({ content: `Failed: ${user}`, ephemeral: true });
            }
        });
    },
};
