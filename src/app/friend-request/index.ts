import { Handler } from "../../friend-requests/app/create/handler";
import { Handler as GetNewFriendRequestByRecieverIdHandler } from "../../friend-requests/app/get-new-by-reciever-id/handler";
import {
  CreateFriendRequestCommand,
  FriendRequest,
} from "../../friend-requests/domain";
import { FriendRequestModel } from "../../friend-requests/infrastructure/model";
import { RepositoryInProducction } from "../../friend-requests/infrastructure/repository-in-production";

const model = FriendRequestModel;
const repository = new RepositoryInProducction(model);
const createHandler = new Handler(repository);
const getNewFriendRequestByRecieverIdHandler =
  new GetNewFriendRequestByRecieverIdHandler(repository);

export async function create(
  command: CreateFriendRequestCommand
): Promise<FriendRequest> {
  return await createHandler.handle(command);
}

export async function findAllNewRequestsByRecieverId(
  recieverId: string
): Promise<FriendRequest[]> {
  try {
    console.log(
      `Attempting to retrieve requests for recieverId: ${recieverId}`
    );
    const requests = await getNewFriendRequestByRecieverIdHandler.handle(
      recieverId
    );
    console.log(`Retrieved requests: ${JSON.stringify(requests)}`);
    return requests;
  } catch (error) {
    console.error("Error in findAllNewRequestsByRecieverId:", error);
    throw new Error("Failed to retrieve new friend requests");
  }
}
