import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler } from "./handler";

describe("When creating a friend request", () => {
  const repository = new RepositoryInMemory();
  const handler = new Handler(repository);
  beforeAll(() => {
    handler.handle({
      senderId: "1",
      recieverId: "2",
      message: "message",
    });
  });
  it("should create the request", () => {
    const request = Array.from(repository.friendRequests)[0];
    expect(request).toBeTruthy();
    expect(request.accepted).toBeFalsy();
  });
});
