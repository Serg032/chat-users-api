import { SignInCommand } from "../../domain";
import { Repository } from "../../domain/repository-interface";

export class Handler {
  constructor(private repository: Repository) {}
  async handle(command: SignInCommand) {
    return this.repository.signIn(command);
  }
}
