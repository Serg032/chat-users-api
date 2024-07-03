"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryInMemory = void 0;
const crypto_1 = require("crypto");
const repository_interface_1 = require("../domain/repository-interface");
class RepositoryInMemory extends repository_interface_1.Repository {
    users = new Set();
    async create(command) {
        const id = (0, crypto_1.randomUUID)();
        this.users.add({ ...command, id });
        return Array.from(this.users).find((user) => user.id === id);
    }
    async findById(id) {
        return Array.from(this.users).find((user) => user.id === id) || null;
    }
    async findByUsername(username) {
        return (Array.from(this.users).find((user) => user.username === username) || null);
    }
    async findByEmail(email) {
        return Array.from(this.users).find((user) => user.email === email) || null;
    }
}
exports.RepositoryInMemory = RepositoryInMemory;
