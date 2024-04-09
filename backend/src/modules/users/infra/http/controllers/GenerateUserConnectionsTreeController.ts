import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeGenerateUserConnectionsTree } from "../../../useCases/factories/MakeGenerateUserConnectionsTree";

export async function GenerateUserConnectionsTreeController(request: FastifyRequest, response: FastifyReply){
    const paramsSchema = z.object({
        id: z.string()
    });
    const { id } = paramsSchema.parse(request.params);
    const GenerateUserConnectionsTree = MakeGenerateUserConnectionsTree();
    const tree = await GenerateUserConnectionsTree.execute(id);
    return response.status(201).send(tree);
}
