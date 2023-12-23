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
exports.UserRepository = void 0;
const Database_1 = require("../Database");
const sequelize_1 = require("sequelize");
// interface UserInterface extends User {
//   id?: number;
//   Username?: string;
//   email?: string;
//   playerName?: string;
//   SteamID?: number;
//   XboxID?: string;
//   DiscordID: number;
// }
class UserRepository {
    getWhitelistData() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield Database_1.User.findAll();
            result = result.map(item => item.dataValues);
            return result;
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield Database_1.User.findOne({
                where: {
                    DiscordID: user.DiscordID,
                },
            });
            if (existingUser) {
                // Update the user information
                return this.updateUser(user);
            }
            else {
                // Add the new user
                return Database_1.User.create(user);
            }
        });
    }
    removeUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Database_1.User.destroy({
                    where: {
                        DiscordID: user.DiscordID,
                    },
                });
                return result;
            }
            catch (error) {
                if (error instanceof sequelize_1.ForeignKeyConstraintError) {
                    throw new Error(`${JSON.stringify(user, null, 2)} is referenced by other entities.`);
                }
                throw error;
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Database_1.User.update(user, {
                    where: {
                        DiscordID: user.DiscordID,
                    },
                });
                return result;
            }
            catch (error) {
                if (error instanceof sequelize_1.UniqueConstraintError) {
                    throw new Error(`${JSON.stringify(user, null, 2)} already exists`);
                }
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
