import { randomUUID } from "crypto";
import { CreateFriendRequestCommand, FriendRequest } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  friendRequests: Set<FriendRequest> = new Set<FriendRequest>();
  create(command: CreateFriendRequestCommand): FriendRequest {
    const friendRequest: FriendRequest = {
      id: randomUUID(),
      senderId: command.senderId,
      possibleFriendId: command.possibleFriendId,
      message: command.message,
      accepted: undefined,
    };
    this.friendRequests.add(friendRequest);

    return friendRequest;
  }

  getAllNewFriendRequestsByUserId(id: string): FriendRequest[] {
    return Array.from(this.friendRequests).filter(
      (friendRequest) =>
        friendRequest.possibleFriendId === id &&
        friendRequest.accepted === undefined
    );
  }
}
