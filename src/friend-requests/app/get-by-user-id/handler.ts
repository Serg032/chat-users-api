import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  handle(id: string) {
    return this.repository.getAllNewFriendRequestsByUserId(id);
  }
}
