import { PrismaUserRepository } from "../../infra/repositories/UserPrismaRepository";
import { AddFriend } from "../AddFriend";


export function MakeAddFriend() {
  const userRepository = new PrismaUserRepository();
  return new AddFriend(userRepository);
}