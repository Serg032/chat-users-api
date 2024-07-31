import { CreateFriendRequestCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";

export class Handler {
  constructor(private repository: RepositoryInMemory) {}
  async handle(recieverId: string): Promise<CreateFriendRequestCommand[]> {
    return this.repository.getAllNewByRecieverId(recieverId);
  }
}

describe("When getting all news friend requests by reciever id", () => {
  const repository = new RepositoryInMemory();
  const recieverId = "1";
  const createCommand: CreateFriendRequestCommand = {
    recieverId,
    senderId: "2",
    message: "message",
  };
  beforeAll(() => {
    repository.friendRequests.add({
      id: "id",
      accepted: null,
      message: createCommand.message,
      recieverId: createCommand.recieverId,
      senderId: createCommand.senderId,
    });
  });
  it("should return the new requests (accepted: null)", async () => {
    const handler = new Handler(repository);
    const result = await handler.handle(recieverId);
    expect(result).toBeTruthy();
    expect(result.length).toBe(1);
    expect(result[0].recieverId).toBe(recieverId);
  });
});
