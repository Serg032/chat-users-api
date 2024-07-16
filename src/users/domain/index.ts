export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  friends?: Friend[];
}
export type CreateUserCommand = Omit<User, "id">;

export interface SignInCommand {
  username: string;
  password: string;
}

export interface Friend {
  id: string;
  username: string;
  email: string;
}
