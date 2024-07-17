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
        return h.response({ response: await findById(request.params.id) });
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
        return h.response({
          response: await signIn(request.payload as SignInCommand),
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        return h.response({ error: "Internal Server Error" }).code(500);
      }
    },
  });

  // Conectar a la base de datos
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASS);
    console.log(process.env.DB);
    console.log(process.env.HOST);
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
