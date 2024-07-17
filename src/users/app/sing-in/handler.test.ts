import { CreateUserCommand, SignInCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateHandler } from "../../app/create-user/handler";
import { Handler } from "./handler";

describe("When sign in", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const createHandler = new CreateHandler(repository);
  const command: CreateUserCommand = {
    email: "email@test.com",
    password: "1234",
    username: "test",
    friends: [],
  };
  beforeAll(async () => {
    await createHandler.handle(command);
  });
  it("if command is ok, should return true", async () => {
    const signIn = await handler.handle({
      username: command.username,
      password: command.password,
    });

    expect(signIn.access).toBeTruthy();
    expect(signIn.denied).toBeFalsy();
    expect(signIn.user).toBeDefined();
  });
  it("if command is not ok, should return false", async () => {
    const signIn = await handler.handle({
      username: "wrong",
      password: "wrong",
    });

    expect(signIn.denied).toBeTruthy();
    expect(signIn.access).toBeFalsy();
    expect(signIn.user).toBeUndefined();
  });
});
