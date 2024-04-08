import { PrismaUserRepository } from "../../infra/repositories/UserPrismaRepository";
import { CreateUser } from "../CreateUser";

export function MakeCreateUser()
{
  const userRepository = new PrismaUserRepository();
  return new CreateUser(userRepository);
}