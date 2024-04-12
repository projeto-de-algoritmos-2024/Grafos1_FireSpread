import { FastifyInstance } from "fastify";
import { CreateUserController } from "./CreateUserController";
import { GenerateUserConnectionsTreeController } from "./GenerateUserConnectionsTreeController";
import { AuthenticateUserController } from "./AuthenticateUserController";
import verifyJWT from "../../../../../shared/middlewares/VerifyJWT";


export async function userRoutes(app: FastifyInstance) {

  app.post("/create", CreateUserController);

  app.post("/authenticate", AuthenticateUserController);

  app.get("/check-auth", verifyJWT);
  app.get("/generate-tree/:id", GenerateUserConnectionsTreeController);
  app.register(authenticatedRoutes);
  
}

const authenticatedRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);
}