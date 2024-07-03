"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../../connection-db"));
exports.UserModel = connection_db_1.default.define("User", {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        // allowNull defaults to true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        // allowNull defaults to true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
    },
}, {
    // Other model options go here
    tableName: "users",
});
// `sequelize.define` also returns the model
console.log(exports.UserModel === connection_db_1.default.models.User); // true
