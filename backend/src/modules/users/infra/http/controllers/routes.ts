import { FastifyInstance } from "fastify";
import { createUserController } from "./CreateUserController";


export async function userRoutes(app: FastifyInstance) {

  app.post("/create", createUserController);
  
}