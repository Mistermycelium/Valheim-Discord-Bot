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
const import_json_1 = __importDefault(require("../../../config/whitelist/import.json"));
const whitelist_1 = require("../../modules/whitelist");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('import')
        .setDescription('Sign up to join one of our servers!'),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(import_json_1.default.map((user) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield whitelist_1.whitelist.addUser(user);
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(`Failed to add user ${user.Username}: ${error.message}`);
                    }
                }
            })));
            console.log('Imported');
            yield interaction.reply({ content: 'Ooga Booga', ephemeral: true });
        });
    },
};
