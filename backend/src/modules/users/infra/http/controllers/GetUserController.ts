import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeAuthenticateUser } from "../../../useCases/factories/MakeAuthenticateUser";
import { env } from "../../../../../config/env";
import { MakeGetUser } from "../../../useCases/factories/MakeGetUser";


export async function GetUserController(request: FastifyRequest, response: FastifyReply ) {

  const id = request.user.sub;  

  const authenticateUserUseCase = MakeGetUser();
  const user = await authenticateUserUseCase.execute({ id });


  return response
  .status(200)
  .send(user);

}