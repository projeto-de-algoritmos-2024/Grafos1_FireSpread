import { FastifyReply, FastifyRequest } from "fastify";
import { MakeGetUser } from "../../../useCases/factories/MakeGetUser";
import { z } from "zod";
import { MakeAddFriend } from "../../../useCases/factories/MakeAddFriend";


export async function AddFriendController(request: FastifyRequest, response: FastifyReply ) {

  const userData = request.user as { sub: string };
  const id = userData.sub;  

  const addFriendBodySchema = z.object({
    inviteId: z.string()
  });

  const data = addFriendBodySchema.parse(request.body);


  const addFriendUseCase = MakeAddFriend();
  const result = await addFriendUseCase.execute({ id, inviteId: data.inviteId});

  if(result == true ) {
    return response
    .status(200)
    .send({ message: "Friend added successfully" });
  }
  else {
    return response
    .status(400)
    .send({ error: "Friend not found" });
  }

}