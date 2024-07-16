import { CreateUserCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When creating a user", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const command: CreateUserCommand = {
    username: "test",
    email: "test",
    password: "test",
    friends: [],
  };

  beforeAll(async () => {
    await handler.handle(command);
  });

  it("the user should be created", () => {
    const users = Array.from(repository.users).length;
    expect(users).toEqual(1);
  });
});
