"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "postgres",
});
exports.default = sequelize;
