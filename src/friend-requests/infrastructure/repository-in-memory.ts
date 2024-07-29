import { randomUUID } from "crypto";
import { CreateFriendRequestCommand, FriendRequest } from "../domain";
import { Repository } from "../domain/repository-interface";

export class RepositoryInMemory extends Repository {
  friendRequests: Set<FriendRequest> = new Set<FriendRequest>();
  async create(command: CreateFriendRequestCommand): Promise<FriendRequest> {
    const friendRequest: FriendRequest = {
      id: randomUUID(),
      senderId: command.senderId,
      possibleFriendId: command.possibleFriendId,
      message: command.message,
      accepted: null,
    };
    this.friendRequests.add(friendRequest);

    return friendRequest;
  }

  async getAllNewFriendRequestsByUserId(id: string): Promise<FriendRequest[]> {
    return Array.from(this.friendRequests).filter(
      (friendRequest) =>
        friendRequest.possibleFriendId === id && friendRequest.accepted === null
    );
  }

  async findById(id: string): Promise<FriendRequest | undefined> {
    return Array.from(this.friendRequests).find(
      (friendRequest) => friendRequest.id === id
    );
  }

  async accept(id: string): Promise<FriendRequest | null> {
    // Convert the Set to an array
    let requests: FriendRequest[] = Array.from(this.friendRequests);

    // Find the request by id
    let requestIndex = requests.findIndex((request) => request.id === id);

    if (requestIndex !== -1) {
      // Modify the found request
      requests[requestIndex] = {
        ...requests[requestIndex],
        accepted: true,
      };

      // Convert the array back to a Set
      this.friendRequests = new Set(requests);

      // Return the modified request
      return requests[requestIndex];
    }

    // Return null if the request was not found
    return null;
  }
}
