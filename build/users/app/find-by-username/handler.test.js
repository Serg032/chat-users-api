"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_in_memory_1 = require("../../infrastructure/repository-in-memory");
const handler_1 = require("../create-user/handler");
const handler_2 = require("./handler");
describe("When finding a user by username", () => {
    const repository = new repository_in_memory_1.RepositoryInMemory();
    const handler = new handler_2.Handler(repository);
    const createHandler = new handler_1.Handler(repository);
    const command = {
        email: "test",
        password: "test",
        username: "username",
    };
    beforeAll(async () => {
        await createHandler.handle(command);
    });
    it("should return the user", async () => {
        const user = await handler.handle(command.username);
        expect(user).toBeTruthy();
        expect(user?.email).toBe(command.email);
        expect(user?.password).toBe(command.password);
        expect(user?.username).toBe(command.username);
    });
    it("should return null if username is wrong", async () => {
        const user = await handler.handle("wrong username");
        expect(user).toBeNull();
    });
});
