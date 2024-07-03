"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_in_memory_1 = require("../../infrastructure/repository-in-memory");
const handler_1 = require("../create-user/handler");
const handler_2 = require("./handler");
describe("When finding a user by email", () => {
    const repository = new repository_in_memory_1.RepositoryInMemory();
    const createHandler = new handler_1.Handler(repository);
    const command = {
        email: "email@email.com",
        password: "test",
        username: "test",
    };
    const handler = new handler_2.Handler(repository);
    beforeAll(async () => {
        await createHandler.handle(command);
    });
    it("should return the user", async () => {
        const user = await handler.handle(command.email);
        expect(user).toBeTruthy();
        expect(user?.email).toBe(command.email);
        expect(user?.password).toBe(command.password);
        expect(user?.username).toBe(command.username);
    });
    it("should return null if email is wrong", async () => {
        const user = await handler.handle("wrong");
        expect(user).toBeNull();
    });
});
