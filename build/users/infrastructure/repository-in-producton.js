"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryInProducction = void 0;
const crypto_1 = require("crypto");
const repository_interface_1 = require("../domain/repository-interface");
class RepositoryInProducction extends repository_interface_1.Repository {
    userModel;
    constructor(userModel) {
        super();
        this.userModel = userModel;
    }
    async create(command) {
        try {
            const newUserInstance = this.userModel.build({
                ...command,
                id: (0, crypto_1.randomUUID)(),
            });
            const userCreated = await newUserInstance.save();
            return userCreated.toJSON();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findById(id) {
        try {
            return (await this.userModel.findByPk(id));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findByUsername(username) {
        try {
            return (await this.userModel.findOne({
                where: { username },
            }));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findByEmail(email) {
        try {
            return (await this.userModel.findOne({
                where: {
                    email,
                },
            }));
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.RepositoryInProducction = RepositoryInProducction;
