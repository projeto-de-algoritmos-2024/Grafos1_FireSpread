import { FastifyReply, FastifyRequest } from "fastify";
import { MakeGetUser } from "../../../useCases/factories/MakeGetUser";


export async function GetUserController(request: FastifyRequest, response: FastifyReply ) {

  const userData = request.user as { sub: string };
  const id = userData.sub;  

  const getUserUseCase = MakeGetUser();
  const user = await getUserUseCase.execute({ id });


  return response
  .status(200)
  .send(user);

}