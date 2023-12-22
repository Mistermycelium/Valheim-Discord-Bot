"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Server extends sequelize_1.Model {
    static initModel(sequelize) {
        return super
            .init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            guildId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
            },
            ip: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            port: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Server',
        });
    }
}
exports.default = Server;
