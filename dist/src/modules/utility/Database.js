"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServerStatus = exports.Server = exports.User = exports.db = void 0;
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./models/User"));
exports.User = User_1.default;
const Server_1 = __importDefault(require("./models/Server"));
exports.Server = Server_1.default;
const UserServerStatus_1 = __importDefault(require("./models/UserServerStatus"));
exports.UserServerStatus = UserServerStatus_1.default;
const db = new sequelize_1.Sequelize('vhbot', 'VHBot', 'Taco', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './devsequelize.sqlite',
});
exports.db = db;
User_1.default.initModel(db);
Server_1.default.initModel(db);
UserServerStatus_1.default.initModel(db);
User_1.default.belongsToMany(Server_1.default, { through: UserServerStatus_1.default });
Server_1.default.belongsToMany(User_1.default, { through: UserServerStatus_1.default });
