import { PrismaUserRepository } from "../../infra/repositories/UserPrismaRepository";
import { AuthenticateUser } from "../AuthenticateUser";


export function MakeAuthenticateUser() {
  const userRepository = new PrismaUserRepository();
  return new AuthenticateUser(userRepository);
}