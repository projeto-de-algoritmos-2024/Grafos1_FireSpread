import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { userRoutes } from "./modules/users/infra/http/controllers/routes";

export const app = fastify();

app.register(fastifyCors)

app.register(userRoutes, { prefix: "/users" });



app.setErrorHandler((error, _, reply) => {
  console.error(error);
  reply.code(500).send({ message: "Internal server error" });

  console.error(error);
})


