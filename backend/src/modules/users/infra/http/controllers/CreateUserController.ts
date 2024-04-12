import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeCreateUser } from "../../../useCases/factories/MakeCreateUser";

export async function CreateUserController(request: FastifyRequest, response: FastifyReply){
    const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        dateOfBirth: z.coerce.date(),
        receivedInviteId: z.number().optional(),
        enrollment: z.string()
    });


        const data = createUserBodySchema.parse(request.body);
        const createUserUseCase = MakeCreateUser();
        const user = await createUserUseCase.execute(data);
        return response.status(201).send(user);

}
