import { CreateUserCommand, User } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  async handle(command: CreateUserCommand): Promise<User> {
    return await this.repository.create(command);
  }
}
