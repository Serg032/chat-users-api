import { CreateFriendRequestCommand } from "../../domain";
import { RepositoryInMemory } from "../../infrastructure/repository-in-memory";

export class Handler {
  constructor(private repository: RepositoryInMemory) {}
  async handle(recieverId: string): Promise<CreateFriendRequestCommand[]> {
    return this.repository.getAllNewByRecieverId(recieverId);
  }
}
