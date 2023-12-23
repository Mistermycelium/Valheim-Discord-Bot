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
exports.whitelist = void 0;
const UserRepository_1 = require("./utility/repositories/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
const node_fs_1 = __importDefault(require("node:fs"));
// import ftpConn from './utility/ftpconn';
let whitelistData;
function buildWhitelist(Data) {
    let content = '';
    // Build the whitelist content
    Data.forEach((user) => {
        let userstr = '';
        if (user.SteamID) {
            userstr = `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.SteamID}\n\n`;
            if (user.XboxID) {
                userstr = userstr + `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.XboxID}\n\n`;
            }
        }
        else if (user.XboxID) {
            userstr = `// Discord ID: ${user.DiscordID} Username: ${user.Username}\n${user.XboxID}\n\n`;
        }
        content = content + userstr;
    });
    return content;
}
function writeWhitelist(content) {
    node_fs_1.default.writeFile('./config/whitelist/whitelist.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // success
    });
}
// function uploadWhitelist() {
//   ftpConn.uploadWhitelist('./whitelist/whitelist.txt');
// }
function maptoStrings(arr) {
    arr = arr.map((item) => (Object.assign(Object.assign({}, item), { DiscordID: String(item.DiscordID), SteamID: String(item.SteamID) })));
}
// writeWhitelist(buildWhitelist(whitelistData));
exports.whitelist = {
    loadData: function () {
        return __awaiter(this, void 0, void 0, function* () {
            whitelistData = yield userRepository.getWhitelistData();
            console.log('loaded whitelist data');
        });
    },
    // uploadWhitelist: uploadWhitelist(),
    // get whitelistData() {
    //   return whitelistData;
    // },
    findUser: function (discID) {
        return __awaiter(this, void 0, void 0, function* () {
            const usr = whitelistData.find((user) => user.DiscordID === discID);
            const whitelist = buildWhitelist(whitelistData);
            writeWhitelist(whitelist);
            // uploadWhitelist();
            return usr;
        });
    },
    addUser: function (user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userRepository.addUser(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
            whitelistData.push(user);
            const whitelist = buildWhitelist(whitelistData);
            writeWhitelist(whitelist);
            // uploadWhitelist();
            console.log(user);
        });
    },
    removeUser: function (user) {
        return __awaiter(this, void 0, void 0, function* () {
            whitelistData = whitelistData.filter((item) => item.DiscordID !== user.DiscordID);
            const whitelist = buildWhitelist(whitelistData);
            writeWhitelist(whitelist);
            // uploadWhitelist();
            userRepository.removeUser(user);
        });
    },
    updateUser: function (user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userRepository.updateUser(user);
            whitelistData = whitelistData.map((item) => item.DiscordID === user.DiscordID ? Object.assign(Object.assign({}, item), user) : item);
            // whitelistData.push(user);
            console.log(whitelistData);
            // console.log(user);
            const whitelist = buildWhitelist(whitelistData);
            writeWhitelist(whitelist);
            // uploadWhitelist();
            // console.log(user);
        });
    },
};
