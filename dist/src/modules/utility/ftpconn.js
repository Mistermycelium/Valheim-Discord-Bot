"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadWhitelist = void 0;
const config_json_1 = require("../../config.json");
const basic_ftp_1 = __importDefault(require("basic-ftp"));
async function uploadWhitelist(whitelist) {
    if (!Array.isArray(config_json_1.ftplogins)) {
        return;
    }
    config_json_1.ftplogins.forEach(async (login) => {
        const client = new basic_ftp_1.default.Client();
        client.ftp.verbose = true;
        try {
            await client.access(login);
            if (login.folder) {
                await client.uploadFrom(whitelist, `${login.folder}/whitelist.txt`);
            }
            else {
                await client.uploadFrom(whitelist, 'default/whitelist.txt');
            }
        }
        catch (err) {
            console.log(err);
        }
        client.close();
    });
}
exports.uploadWhitelist = uploadWhitelist;
