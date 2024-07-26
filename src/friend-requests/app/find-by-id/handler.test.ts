import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";
import { Handler as CreateHandler } from "../create/handler";
import { Handler } from "./handler";

describe("When finding a request by id", () => {
  const repository = new RepositoryInMemory();
  const createHandler = new CreateHandler(repository);
  const handler = new Handler(repository);
  let id: string;
  let senderId = "1";
  beforeAll(() => {
    createHandler.handle({
      senderId,
      message: "message",
      possibleFriendId: "2",
    });
    id = Array.from(repository.friendRequests).find(
      (request) => request.senderId === senderId
    )?.id!;
  });
  it("should return the request", () => {
    const request = handler.handle(id);
    expect(request).toBeTruthy();
    expect(request?.id).toBe(id);
  });
});
