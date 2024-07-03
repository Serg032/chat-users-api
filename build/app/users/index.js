"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByEmail = exports.findByUsername = exports.findById = exports.create = void 0;
const handler_1 = require("../../users/app/create-user/handler");
const model_1 = require("../../users/infrastructure/model");
const repository_in_producton_1 = require("../../users/infrastructure/repository-in-producton");
const handler_2 = require("../../users/app/find-by-id/handler");
const handler_3 = require("../../users/app/find-by-username/handler");
const handler_4 = require("../../users/app/find-by-email/handler");
const userModel = model_1.UserModel;
const repository = new repository_in_producton_1.RepositoryInProducction(userModel);
const createHandler = new handler_1.Handler(repository);
const findByIdHandler = new handler_2.Handler(repository);
const findByUsernameHandler = new handler_3.Handler(repository);
const findByEmailHandler = new handler_4.Handler(repository);
const create = async (command) => {
    return await createHandler.handle({
        email: command.email,
        password: command.password,
        username: command.username,
    });
};
exports.create = create;
const findById = async (id) => {
    return await findByIdHandler.handle(id);
};
exports.findById = findById;
const findByUsername = async (username) => {
    return await findByUsernameHandler.handle(username);
};
exports.findByUsername = findByUsername;
const findByEmail = async (email) => {
    return await findByEmailHandler.handle(email);
};
exports.findByEmail = findByEmail;
