import { PrismaUserRepository } from "../../infra/repositories/UserPrismaRepository";
import { LuckyUser } from "../LuckyUser";

export function MakeLuckyUser() {
  const userRepository = new PrismaUserRepository();
  return new LuckyUser(userRepository);
}