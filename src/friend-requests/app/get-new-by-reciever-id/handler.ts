import { CreateFriendRequestCommand, FriendRequest } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  async handle(recieverId: string): Promise<FriendRequest[]> {
    return this.repository.getAllNewByRecieverId(recieverId);
  }
}
