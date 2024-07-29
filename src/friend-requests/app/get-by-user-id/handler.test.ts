import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateHandler } from "../create/handler";
import { Handler } from "./handler";

describe("When getting all the friend requests of a user", () => {
  const repository = new RepositoryInMemory();
  const createFriendUserHandler = new CreateHandler(repository);
  const handler = new Handler(repository);
  beforeAll(() => {
    repository.friendRequests.add({
      id: "custom",
      senderId: "2",
      possibleFriendId: "1",
      message: "message 10",
      accepted: true,
    });
    createFriendUserHandler.handle({
      senderId: "3",
      possibleFriendId: "1",
      message: "message",
    });

    createFriendUserHandler.handle({
      senderId: "4",
      possibleFriendId: "1",
      message: "message 2",
    });

    createFriendUserHandler.handle({
      senderId: "5",
      possibleFriendId: "1",
      message: "message 3",
    });
  });
  it("should return the new requests (accepted: null)", () => {
    const newFriendRequests = handler.handle("1");
    expect(newFriendRequests.length).toBe(3);
    newFriendRequests.forEach((newFriendRequest) => {
      expect(newFriendRequest.accepted).toBeFalsy();
      expect(newFriendRequest.possibleFriendId).toBe("1");
    });
  });
});
