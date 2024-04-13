import { PrismaUserRepository } from "../../infra/repositories/UserPrismaRepository";
import { GetUsersCount } from "../GetUsersCount";


export function MakeGetUsersCount() {
  const userRepository = new PrismaUserRepository();
  return new GetUsersCount(userRepository);
}