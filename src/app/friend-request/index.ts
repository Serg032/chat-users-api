import { Handler } from "../../friend-requests/app/create/handler";
import {
  CreateFriendRequestCommand,
  FriendRequest,
} from "../../friend-requests/domain";
import { FriendRequestModel } from "../../friend-requests/infrastructure/model";
import { RepositoryInProducction } from "../../friend-requests/infrastructure/repository-in-production";

const model = FriendRequestModel;
const repository = new RepositoryInProducction(model);
const createHandler = new Handler(repository);

export async function create(
  command: CreateFriendRequestCommand
): Promise<FriendRequest> {
  return await createHandler.handle(command);
}
