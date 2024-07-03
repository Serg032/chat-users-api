import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}

  async handle(username: string) {
    return await this.repository.findByUsername(username);
  }
}
