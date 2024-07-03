"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_in_memory_1 = require("../../infrastructure/repository-in-memory");
const handler_1 = require("./handler");
describe("When creating a user", () => {
    const repository = new repository_in_memory_1.RepositoryInMemory();
    const handler = new handler_1.Handler(repository);
    const command = {
        username: "test",
        email: "test",
        password: "test",
    };
    beforeAll(async () => {
        await handler.handle(command);
    });
    it("the user should be created", () => {
        const users = Array.from(repository.users).length;
        expect(users).toEqual(1);
    });
});
