"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_in_memory_1 = require("../../infrastructure/repository-in-memory");
const handler_1 = require("../create-user/handler");
const handler_2 = require("./handler");
describe("When asking for a user by id", () => {
    const repository = new repository_in_memory_1.RepositoryInMemory();
    const createUserHandler = new handler_1.Handler(repository);
    const handler = new handler_2.Handler(repository);
    beforeAll(async () => {
        await createUserHandler.handle({
            username: "test",
            email: "test",
            password: "test",
        });
    });
    it("should return the user", async () => {
        const userId = repository.users.values().next().value.id;
        const user = await handler.handle(userId);
        expect(user).not.toBeNull();
        expect(user.id).toEqual(userId);
    });
    it("should return null if the user does not exist", async () => {
        const userId = "non-existing-id";
        const user = await handler.handle(userId);
        expect(user).toBeNull();
    });
});
