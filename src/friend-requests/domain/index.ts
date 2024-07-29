export interface FriendRequest {
  id: string;
  senderId: string;
  possibleFriendId: string;
  message: string;
  accepted: boolean | null;
}
export type CreateFriendRequestCommand = Omit<
  FriendRequest,
  "id" | "accepted" | "declined"
>;
