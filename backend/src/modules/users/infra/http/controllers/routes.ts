import { FastifyInstance } from "fastify";
import { createUserController } from "./CreateUserController";
import { GenerateUserConnectionsTreeController } from "./GenerateUserConnectionsTreeController";
import { AuthenticateUserController } from "./AuthenticateUserController";


export async function userRoutes(app: FastifyInstance) {

  app.post("/create", createUserController);

  app.get("/generate-tree/:id", GenerateUserConnectionsTreeController);
  app.post("/authenticate", AuthenticateUserController);
  
}