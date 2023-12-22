"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserServerStatus extends sequelize_1.Model {
    static initModel(sequelize) {
        return super.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            statusType: {
                type: sequelize_1.DataTypes.ENUM('PERMITTED', 'BANNED', 'KICKED'),
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'UserServerStatus',
        });
    }
}
exports.default = UserServerStatus;
