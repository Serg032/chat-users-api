"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("dotenv/config");
const hapi_1 = __importDefault(require("@hapi/hapi"));
const connection_db_1 = __importDefault(require("./connection-db"));
const users_1 = require("./app/users");
const init = async () => {
    const server = hapi_1.default.server({
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
                const payload = request.payload;
                const userNameAlreadyInUse = await (0, users_1.findByUsername)(payload.username);
                const emailAlreadyInUse = await (0, users_1.findByEmail)(payload.email);
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
                const userCreated = await (0, users_1.create)(payload);
                return h.response(userCreated).code(201);
            }
            catch (error) {
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
                return await (0, users_1.findById)(request.params.id);
            }
            catch (error) {
                console.error("Error fetching users:", error);
                return h.response({ error: "Internal Server Error" }).code(500);
            }
        },
    });
    // Conectar a la base de datos
    try {
        await connection_db_1.default.authenticate();
        console.log("Connection has been established successfully.");
        await connection_db_1.default.sync(); // Sincroniza modelos con la base de datos
    }
    catch (error) {
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
