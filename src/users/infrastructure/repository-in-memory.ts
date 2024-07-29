import { randomUUID } from "crypto";
import {
  CreateUserCommand,
  Friend,
  SignInCommand,
  SignInResponse,
  UpdateCommand,
  User,
} from "../domain";
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

  async signIn(command: SignInCommand): Promise<SignInResponse> {
    const user = Array.from(this.users).find(
      (user) =>
        user.username === command.username && user.password === command.password
    );

    if (!user) {
      return { access: false, denied: true };
    }

    return {
      access: true,
      user,
    };
  }

  async addFriend(
    senderId: string,
    possibleFriendId: string
  ): Promise<{
    requestSender: User;
    possibleFriend: User;
  } | null> {
    const sender = await this.findById(senderId);
    const possibleFriend = await this.findById(possibleFriendId);

    if (sender && possibleFriend) {
      const users = Array.from(this.users);

      const senderUpdatedIndex = users.findIndex((u) => u.id === senderId);
      const possibleFriendUpdatedIndex = users.findIndex(
        (u) => u.id === possibleFriendId
      );

      if (senderUpdatedIndex !== -1 && possibleFriendUpdatedIndex !== -1) {
        if (!users[senderUpdatedIndex].friends) {
          users[senderUpdatedIndex].friends = [];
          users[senderUpdatedIndex].friends.push(possibleFriend);
        } else {
          users[senderUpdatedIndex] = {
            ...users[senderUpdatedIndex],
            friends: [...users[senderUpdatedIndex].friends, possibleFriend],
          };
        }
        if (!users[possibleFriendUpdatedIndex].friends) {
          users[possibleFriendUpdatedIndex].friends = [];
          users[possibleFriendUpdatedIndex].friends.push(sender);
        } else {
          users[possibleFriendUpdatedIndex] = {
            ...users[possibleFriendUpdatedIndex],
            friends: [...users[possibleFriendUpdatedIndex].friends, sender],
          };
        }

        return {
          requestSender: sender,
          possibleFriend: possibleFriend,
        };
      }
    }

    return null;
  }

  update(id: string, command: UpdateCommand): User | null {
    const users = Array.from(this.users);
    let user = users.find((user) => user.id === id);

    if (user) {
      let userIndex = Array.from(this.users).findIndex(
        (user2) => user2.id === user?.id
      );

      users[userIndex] = {
        ...user,
        email: command.email ? command.email : user.email,
        password: command.password ? command.password : user.password,
        username: command.username ? command.username : user.username,
      };

      if (command.friends) {
        users[userIndex].friends.push(...command.friends);
      }

      this.users = new Set(users);
      return user;
    }

    return null;
  }
}
