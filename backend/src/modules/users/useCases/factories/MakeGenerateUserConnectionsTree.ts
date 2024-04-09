import { PrismaUserRepository } from "../../infra/repositories/UserPrismaRepository";
import { GenerateUserConnectionsTree } from "../GenerateUserConnectionsTree";

export function MakeGenerateUserConnectionsTree()
{
  const userRepository = new PrismaUserRepository();
  return new GenerateUserConnectionsTree(userRepository);
}