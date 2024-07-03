import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  async handle(email: string) {
    return await this.repository.findByEmail(email);
  }
}
