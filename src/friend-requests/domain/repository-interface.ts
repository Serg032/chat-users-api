import { CreateFriendRequestCommand, FriendRequest } from ".";

export abstract class Repository {
  abstract create(command: CreateFriendRequestCommand): FriendRequest;
  abstract getAllNewFriendRequestsByUserId(id: string): FriendRequest[];
  abstract findById(id: string): FriendRequest | undefined;
  abstract accept(id: string): FriendRequest | null;
}
