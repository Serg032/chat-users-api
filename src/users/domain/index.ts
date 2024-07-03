export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}
export type CreateUserCommand = Omit<User, "id">;
