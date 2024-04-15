import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeAuthenticateUser } from "../../../useCases/factories/MakeAuthenticateUser";
import { env } from "../../../../../config/env";


export async function AuthenticateUserController(request: FastifyRequest, response: FastifyReply ) {
  const registerBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  
  const { email, password } = registerBodySchema.parse(request.body);

  const authenticateUserUseCase = MakeAuthenticateUser();
  const user = await authenticateUserUseCase.execute({ email, password });

  const token = await response.jwtSign(
  {

  },
  {
    sign: {
      sub: user.id,
      expiresIn: "1d",
    }
  }
  );

  const refresh_token = await response.jwtSign({}, {
    sign: {
      sub: user.id,
      expiresIn: "7d",
    }
  })


  return response.setCookie(env.REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }).setCookie(env.TOKEN_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  .status(200)
  .send(user);

}