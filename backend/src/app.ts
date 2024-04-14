import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { userRoutes } from "./modules/users/infra/http/controllers/routes";
import fastifyCookie from "@fastify/cookie";
import multer from "fastify-multer";
import fastifyJwt from "@fastify/jwt";
import { env } from "./config/env";
import { ZodError } from "zod";
import { AppError } from "./shared/errors/interface/AppError";
import { EmailVerificationRoutes } from "./modules/emailVerification/infra/http/controllers/routes";
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
app.register(EmailVerificationRoutes, { prefix: "/email" });


app.setErrorHandler((error, _, response) => {

  console.log(error);
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: "Validation Error",
      issues: error.flatten().fieldErrors,
    });
  } else if (error instanceof AppError) {
    return response.status(error.statusCode).send({
      message: error.message,
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Should log to external tool like DataDog/NewRelic/Sentry
  }

  return response.status(500).send({ error: "Internal Server Error" });
});
