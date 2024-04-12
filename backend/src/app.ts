import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { userRoutes } from "./modules/users/infra/http/controllers/routes";
import fastifyCookie from "@fastify/cookie";
import multer from "fastify-multer";
import fastifyJwt from "@fastify/jwt";
import { env } from "./config/env";
export const app = fastify();

app.register(fastifyCors,
  {
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
);
app.register(fastifyCookie);

app.register(multer.contentParser);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: env.REFRESH_TOKEN_COOKIE_NAME,
    signed: false,
  },
  sign: {
    expiresIn: "7d",
  },
})

app.register(userRoutes, { prefix: "/users" });



app.setErrorHandler((error, _, reply) => {
  console.error(error);
  reply.code(500).send({ message: "Internal server error " + error });

})


