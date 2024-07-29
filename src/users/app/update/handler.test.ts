import { CreateUserCommand, UpdateCommand, User } from "../../domain";
import { Repository } from "../../domain/repository-interface";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateHandler } from "../create-user/handler";

export class Handler {
  constructor(private repository: Repository) {}
  handle(id: string, command: UpdateCommand): User | null {
    return this.repository.update(id, command);
  }
}

describe("When updating a user", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  const createUserHandler = new CreateHandler(repository);
  const createCommand: CreateUserCommand = {
    email: "email@email",
    friends: [],
    password: "password",
    username: "username",
  };
  let userId: string;
  const firstFriendId = "4";
  const firstFriendEmail = "updatedEmail";
  const firstFriendUsername = "firstFriend";
  const secondFriendId = "8";
  const secondFriendEmail = "secondfriend@gmail.com";
  const secondFriendUsername = "secondFriend";
  let updateCommand: UpdateCommand = {
    username: "updatedUsername",
    email: "updatedEmail",
    password: "updatedPassword",
  };
  let user: User | undefined;
  beforeAll(async () => {
    await createUserHandler.handle(createCommand);
    userId = Array.from(repository.users).find(
      (user) => user.email === "email@email"
    )?.id!;
  });
  it("when a username is updated, user should be updated", () => {
    handler.handle(userId, updateCommand);
    user = Array.from(repository.users).find((user) => user.id === userId);
    if (user) {
      expect(user.username).toBe(updateCommand.username);
    }
  });
  it("when de email is wanted to be updated it should be updated", () => {
    handler.handle(userId, { email: updateCommand.email });
    user = Array.from(repository.users).find((user) => user.id === userId);
    if (user) {
      expect(user.email).toBe(updateCommand.email);
    }
  });
  it("when de password is wanted to be updated it should be updated", () => {
    handler.handle(userId, { password: updateCommand.password });
    user = Array.from(repository.users).find((user) => user.id === userId);
    if (user) {
      expect(user.password).toBe(updateCommand.password);
    }
  });
  it("when de friends are wanted to be updated it should be updated", () => {
    updateCommand = {
      ...updateCommand,
      friends: [
        {
          id: firstFriendId,
          email: firstFriendEmail,
          username: firstFriendUsername,
        },
        {
          id: secondFriendId,
          email: secondFriendEmail,
          username: secondFriendUsername,
        },
      ],
    };
    handler.handle(userId, { friends: updateCommand.friends });
    user = Array.from(repository.users).find((user) => user.id === userId);
    if (user) {
      expect(user.friends.length).toBe(2);
    }
  });
});
