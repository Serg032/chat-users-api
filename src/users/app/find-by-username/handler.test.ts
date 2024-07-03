import { CreateUserCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateHandler } from "../create-user/handler";
import { Handler } from "./handler";

describe("When finding a user by username", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const createHandler = new CreateHandler(repository);
  const command: CreateUserCommand = {
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
