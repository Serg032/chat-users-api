import { FriendRequest } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  handle(id: string): FriendRequest | null {
    return this.repository.accept(id);
  }
}
