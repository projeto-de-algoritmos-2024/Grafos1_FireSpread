import { FastifyReply, FastifyRequest } from "fastify";
import { MakeSearchUserConnection } from "../../../useCases/factories/MakeSeachUserConnection";

export async function SearchUserConnectionController(request: FastifyRequest, response: FastifyReply){
    const userData = request.user as { sub: string };
    const id = userData.sub;  
    const SearchUserConnection = MakeSearchUserConnection();
    const connection = await SearchUserConnection.execute(id);
    return response.status(201).send(connection);
}
