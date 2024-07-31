import { CreateFriendRequestCommand, FriendRequest } from ".";

export abstract class Repository {
  abstract create(command: CreateFriendRequestCommand): Promise<FriendRequest>;
  abstract findById(id: string): Promise<FriendRequest | undefined>;
  abstract accept(id: string): Promise<FriendRequest | null>;
  abstract getAllNewByRecieverId(recieverId: string): Promise<FriendRequest[]>;
}
