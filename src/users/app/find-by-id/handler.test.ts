import { Repository } from "../../domain/repository-interface";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateUserHandler } from "../create-user/handler";
import { Handler } from "./handler";

describe("When asking for a user by id", () => {
  const repository = new RepositoryInMemory();
  const createUserHandler = new CreateUserHandler(repository);
  const handler = new Handler(repository);
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
    expect(user!.id).toEqual(userId);
  });
  it("should return null if the user does not exist", async () => {
    const userId = "non-existing-id";
    const user = await handler.handle(userId);
    expect(user).toBeNull();
  });
});
