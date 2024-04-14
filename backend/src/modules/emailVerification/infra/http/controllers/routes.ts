

import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { CreateEVController } from "./CreateEVController";


export async function EmailVerificationRoutes(app: FastifyInstance) {

  app.post("/create", CreateEVController);


  
}

