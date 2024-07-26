import { CreateFriendRequestCommand, FriendRequest } from ".";

export abstract class Repository {
  abstract create(command: CreateFriendRequestCommand): FriendRequest;
  abstract getAllNewFriendRequestsByUserId(id: string): FriendRequest[];
}
