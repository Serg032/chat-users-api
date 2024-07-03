import { randomUUID } from "crypto";
import { CreateUserCommand, User } from "../domain";
import { Repository } from "../domain/repository-interface";
import { UserModel } from "./model";

export class RepositoryInProducction extends Repository {
  constructor(private userModel: typeof UserModel) {
    super();
  }
  async create(command: CreateUserCommand): Promise<User> {
    try {
      const newUserInstance = this.userModel.build({
        ...command,
        id: randomUUID(),
      });

      const userCreated = await newUserInstance.save();

      return userCreated.toJSON();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return (await this.userModel.findByPk(id)) as User | null;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      return (await this.userModel.findOne({
        where: { username },
      })) as User | null;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return (await this.userModel.findOne({
        where: {
          email,
        },
      })) as User | null;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
