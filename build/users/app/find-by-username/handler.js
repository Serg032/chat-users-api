"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(username) {
        return await this.repository.findByUsername(username);
    }
}
exports.Handler = Handler;
