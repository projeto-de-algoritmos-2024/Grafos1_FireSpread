import { FastifyInstance } from "fastify";
import { createUserController } from "./CreateUserController";
import { GenerateUserConnectionsTreeController } from "./GenerateUserConnectionsTreeController";


export async function userRoutes(app: FastifyInstance) {

  app.post("/create", createUserController);

  app.get("/generate-tree/:id", GenerateUserConnectionsTreeController);
  
}