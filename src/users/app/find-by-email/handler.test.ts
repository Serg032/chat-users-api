import { CreateUserCommand } from "../../domain";
import { Repository } from "../../domain/repository-interface";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateHandler } from "../create-user/handler";
import { Handler } from "./handler";

describe("When finding a user by email", () => {
  const repository = new RepositoryInMemory();
  const createHandler = new CreateHandler(repository);
  const command: CreateUserCommand = {
    email: "email@email.com",
    password: "test",
    username: "test",
    friends: [],
  };
  const handler = new Handler(repository);
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
