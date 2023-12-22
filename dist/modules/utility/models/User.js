"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            Username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            playerName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            SteamID: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            XboxID: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            DiscordID: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'User',
            validate: {
                eitherSteamIdOrXboxId() {
                    if (!this.SteamID && !this.XboxID) {
                        throw new Error('Either steamId or xboxId must be set');
                    }
                },
            },
        });
    }
}
module.exports = User;
