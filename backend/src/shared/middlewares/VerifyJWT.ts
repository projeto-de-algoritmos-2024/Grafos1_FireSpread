import { FastifyReply, FastifyRequest } from "fastify";

const verifyJWT = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    return response.status(401).send({ error: "Unauthorized: No valid JWT token found" });
  }
};

export default verifyJWT;