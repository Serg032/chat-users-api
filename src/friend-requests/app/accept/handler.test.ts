//  TODO
import { Handler as CreateUserHandler } from "../../../users/app/create-user/handler";
import { Handler as CreateFriendRequestHandler } from "../../app/create/handler";
import { Handler as GetFriendRequestByUserIdHandler } from "../../app/get-by-user-id/handler";
import { RepositoryInMemory as UsersRepository } from "../../../users/infrastructure/repository-in-memory";
import { Repository } from "../../domain/repository-interface";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";

export class Handler {
  constructor(private repository: Repository) {}
  handle(id: string) {
    return this.repository.accept(id);
  }
}

describe("When accepting a friend request", () => {
  const usersRepository = new UsersRepository();
  const createUserHandler = new CreateUserHandler(usersRepository);
  const repository = new RepositoryInMemory();
  const createFriendRequestRepository = new CreateFriendRequestHandler(
    repository
  );
  const getFriendRequestByUserIdHandler = new GetFriendRequestByUserIdHandler(
    repository
  );
  const handler = new Handler(repository);
  const firstUserEmail = "user1@gmail.com";
  const secondUserEmail = "user2@gmail.com";
  let senderId: string;
  let possibleFriendId: string;
  beforeAll(() => {
    createUserHandler.handle({
      email: firstUserEmail,
      password: "123",
      username: "user1",
    });
    createUserHandler.handle({
      email: secondUserEmail,
      password: "123",
      username: "user2",
    });
    const users = Array.from(usersRepository.users);
    senderId = users.find((user) => user.email === firstUserEmail)?.id!;
    possibleFriendId = users.find((user) => user.email === secondUserEmail)
      ?.id!;
    createFriendRequestRepository.handle({
      senderId,
      possibleFriendId,
      message: "message",
    });
  });
  it("should accept the request and add friends in both users", () => {
    const request = getFriendRequestByUserIdHandler.handle(possibleFriendId);
  });
});
