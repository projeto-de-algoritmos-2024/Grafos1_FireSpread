import { PrismaUserRepository } from "../../infra/repositories/UserPrismaRepository";
import { SearchUserConnection } from "../SearchUserConnection";

export function MakeSearchUserConnection()
{
  const userRepository = new PrismaUserRepository();
  return new SearchUserConnection(userRepository);
}