import { FastifyReply, FastifyRequest } from "fastify";
import { MakeGetUsersCount } from "../../../useCases/factories/MakeGetUsersCount";


export async function GetUsersCountController(_: FastifyRequest, response: FastifyReply ) {


  const getUsersCountUseCase = MakeGetUsersCount();
  const usersCount = await getUsersCountUseCase.execute();


  return response
  .status(200)
  .send(usersCount);

}