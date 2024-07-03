import { Handler as CreateHandler } from "../../users/app/create-user/handler";
import { CreateUserCommand } from "../../users/domain";
import { UserModel } from "../../users/infrastructure/model";
import { RepositoryInProducction } from "../../users/infrastructure/repository-in-producton";
import { Handler as FindByIdHandler } from "../../users/app/find-by-id/handler";
import { Handler as FindByUsernameHandler } from "../../users/app/find-by-username/handler";
import { Handler as FindByEmailHandler } from "../../users/app/find-by-email/handler";

const userModel = UserModel;
const repository = new RepositoryInProducction(userModel);
const createHandler = new CreateHandler(repository);
const findByIdHandler = new FindByIdHandler(repository);
const findByUsernameHandler = new FindByUsernameHandler(repository);
const findByEmailHandler = new FindByEmailHandler(repository);

export const create = async (command: CreateUserCommand) => {
  return await createHandler.handle({
    email: command.email,
    password: command.password,
    username: command.username,
  });
};

export const findById = async (id: string) => {
  return await findByIdHandler.handle(id);
};

export const findByUsername = async (username: string) => {
  return await findByUsernameHandler.handle(username);
};

export const findByEmail = async (email: string) => {
  return await findByEmailHandler.handle(email);
};
