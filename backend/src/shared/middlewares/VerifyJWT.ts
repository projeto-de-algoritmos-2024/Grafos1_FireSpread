import { FastifyReply, FastifyRequest } from "fastify";

const verifyJWT = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    await request.jwtVerify();

    return response.status(200).send({ message: "JWT is valid and user is authenticated" });
  } catch (err) {
    return response.status(401).send({ error: "Unauthorized: No valid JWT token found" });
  }
};

export default verifyJWT;