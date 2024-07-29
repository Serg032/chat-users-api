import { randomUUID } from "crypto";
import { CreateFriendRequestCommand, FriendRequest } from "../domain";
import { Repository } from "../domain/repository-interface";
import { FriendRequestModel } from "./model";

export class RepositoryInProducction extends Repository {
  constructor(private model: typeof FriendRequestModel) {
    super();
  }

  async create(command: CreateFriendRequestCommand): Promise<FriendRequest> {
    try {
      const newFriendRequestInstance = this.model.build({
        ...command,
        id: randomUUID(),
      });

      const friendRequestCreated = await newFriendRequestInstance.save();

      return friendRequestCreated.toJSON();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<FriendRequest | undefined> {
    try {
      const friendRequest = (await this.model.findByPk(
        id
      )) as FriendRequest | null;
      if (friendRequest) {
        return friendRequest;
      }
      if (!friendRequest) {
        return undefined;
      }
    } catch (error) {}
  }

  async getAllNewFriendRequestsByUserId(id: string): Promise<FriendRequest[]> {
    try {
      const friendRequests = await this.model.findAll({
        where: {
          id,
          accepted: null,
        },
      });

      return friendRequests.map((request) => request.get({ plain: true }));
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async accept(id: string): Promise<FriendRequest | null> {
    try {
      const requestModel = await this.model.findByPk(id);
      if (requestModel) {
        const request = (await requestModel.get({
          plain: true,
        })) as FriendRequest;

        await requestModel.update({
          accept: true,
        });

        await requestModel.save();

        return (await this.model.findByPk(id))!.get({ plain: true });
      }
      return null;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
