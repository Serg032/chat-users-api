import { CreateFriendRequestCommand } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  public handle(command: CreateFriendRequestCommand) {
    this.repository.create(command);
  }
}
