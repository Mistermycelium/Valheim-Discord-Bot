"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../Database");
const sequelize_1 = require("sequelize");
class UserRepository {
    async getWhitelistData() {
        let result = await Database_1.User.findAll();
        result = result.map(item => item.dataValues);
        return result;
    }
    async addUser(user) {
        const existingUser = await Database_1.User.findOne({
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
    }
    async removeUser(user) {
        try {
            const result = await Database_1.User.destroy({
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
    }
    async updateUser(user) {
        try {
            const result = await Database_1.User.update(user, {
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
    }
}
exports.default = UserRepository;
