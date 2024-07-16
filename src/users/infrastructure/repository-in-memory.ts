import { randomUUID } from "crypto";
import { CreateUserCommand, SignInCommand, User } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  users: Set<User> = new Set();

  async create(command: CreateUserCommand): Promise<User> {
    const id = randomUUID();
    this.users.add({ ...command, id });

    return Array.from(this.users).find((user) => user.id === id)!;
  }

  async findById(id: string): Promise<User | null> {
    return Array.from(this.users).find((user) => user.id === id) || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return (
      Array.from(this.users).find((user) => user.username === username) || null
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return Array.from(this.users).find((user) => user.email === email) || null;
  }

  async signIn(command: SignInCommand): Promise<boolean> {
    const user = Array.from(this.users).find(
      (user) =>
        user.username === command.username && user.password === command.password
    );

    if (!user) {
      return false;
    }

    return true;
  }
}
