import { FastifyReply, FastifyRequest } from "fastify";
import { MakeCreateEV } from "../../../useCases/factories/MakeCreateEV";
import { z } from "zod";


export async function CreateEVController(request: FastifyRequest, response: FastifyReply) {

  const paramsSchema = z.object({
    email: z.string()
  });

  console.log(request.body);
  
  const { email } = paramsSchema.parse(request.body);

  const createEVUseCase = MakeCreateEV();
  await createEVUseCase.execute(email);

  return response
    .status(201)
    .send(
      {
        message: "Verificação de email enviada com sucesso",
      }
    );
}