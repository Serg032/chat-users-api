import {
  CreateUserCommand,
  SignInCommand,
  SignInResponse,
  UpdateCommand,
  User,
} from ".";

export abstract class Repository {
  abstract create(command: CreateUserCommand): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract signIn(command: SignInCommand): Promise<SignInResponse>;
  abstract update(id: string, command: UpdateCommand): User | null;
}
