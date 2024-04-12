import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../../../../../config/env";


export async function LogoutUserController(_: FastifyRequest, response: FastifyReply){

  response.clearCookie(env.TOKEN_COOKIE_NAME);
  response.clearCookie(env.REFRESH_TOKEN_COOKIE_NAME);
  return response.status(200).send({ message: "User logged out successfully" });
}
