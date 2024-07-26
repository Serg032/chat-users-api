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

  findById(id: string): FriendRequest | undefined {
    return Array.from(this.friendRequests).find(
      (friendRequest) => friendRequest.id === id
    );
  }

  accept(id: string): FriendRequest | null {
    let requests: FriendRequest[] = Array.from(this.friendRequests);
    let request = requests.find((request) => request.id === id);
    if (request) {
      request = {
        ...request,
        accepted: true,
      };
      requests.push(request);
      this.friendRequests = new Set(requests);

      return request;
    }

    return null;
  }
}
