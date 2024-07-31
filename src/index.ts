// src/index.ts
import "dotenv/config";
import Hapi from "@hapi/hapi";
import sequelize from "./connection-db";
import { CreateUserCommand, SignInCommand } from "./users/domain";
import {
  create,
  findByEmail,
  findById,
  findByUsername,
  signIn,
} from "./app/users";
import {
  create as createRequest,
  findAllNewRequestsByRecieverId,
} from "./app/friend-request";
import { CreateFriendRequestCommand } from "./friend-requests/domain";

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST,
    routes: {
      cors: true,
    },
  });

  // Define rutas
  server.route({
    method: "POST",
    path: "/user",
    handler: async (request, h) => {
      try {
        const payload = request.payload as CreateUserCommand;
        const userNameAlreadyInUse = await findByUsername(payload.username);
        const emailAlreadyInUse = await findByEmail(payload.email);
        if (userNameAlreadyInUse) {
          return h
            .response({
              message: "User name already exists",
            })
            .code(409);
        }
        if (emailAlreadyInUse) {
          return h
            .response({
              message: "Email name already exists",
            })
            .code(409);
        }
        const userCreated = await create(payload);
        return h.response(userCreated).code(201);
      } catch (error) {
        console.error("Error creating user:", error);
        return h.response({ error: "Internal Server Error" }).code(500);
      }
    },
  });

  server.route({
    method: "GET",
    path: "/user/{id}",
    handler: async (request, h) => {
      try {
        const signInRespose = await findById(request.params.id);
        if (signInRespose) {
          return h.response(signInRespose);
        } else {
          return h.response({ error: "User does not exist." });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        return h.response({ error: "Internal Server Error" }).code(500);
      }
    },
  });

  server.route({
    method: "POST",
    path: "/user/signin",
    handler: async (request, h) => {
      try {
        const signInResponse = await signIn(request.payload as SignInCommand);
        return h.response(signInResponse);
      } catch (error) {
        console.error("Error fetching users:", error);
        return h.response({ error: "Internal Server Error" }).code(500);
      }
    },
  });

  server.route({
    method: "GET",
    path: "/user/by-username/{username}",
    handler: async (request, h) => {
      try {
        const usernamePayload = request.params.username;
        const findUserByUsernameResponse = await findByUsername(
          usernamePayload
        );
        if (findUserByUsernameResponse) {
          return h.response(findUserByUsernameResponse);
        } else {
          return h.response({
            message: `User with ${usernamePayload} does not exist`,
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        return h.response({ error: "Internal Server Error" }).code(500);
      }
    },
  });

  server.route({
    method: "POST",
    path: "/friend-request",
    handler: async (request, h) => {
      try {
        const command: CreateFriendRequestCommand =
          request.payload as CreateFriendRequestCommand;

        const requestCreated = await createRequest(command);

        return h
          .response({
            request: requestCreated,
          })
          .code(201);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  server.route({
    method: "GET",
    path: "/friend-request/new/{recieverId}",
    handler: async (request, h) => {
      try {
        const recieverId = request.params.recieverId as string;
        if (!recieverId) {
          return h.response({
            error: "Reciever id not found in the params",
          });
        }
        const newRequests = await findAllNewRequestsByRecieverId(recieverId);

        return h
          .response({
            newrequests: newRequests,
          })
          .code(200);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  // Conectar a la base de datos
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync(); // Sincroniza modelos con la base de datos
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }

  // Iniciar el servidor
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
