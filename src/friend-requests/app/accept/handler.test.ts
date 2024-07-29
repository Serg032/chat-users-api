import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When accepting a request", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  beforeAll(() => {
    repository.friendRequests.add({
      id: "1",
      accepted: null,
      message: "message",
      possibleFriendId: "1",
      senderId: "2",
    });
  });
  it("should be accepted", () => {
    handler.handle("1");
    expect(Array.from(repository.friendRequests)[0].accepted).toBeTruthy();
  });
});
