import { Prisma, PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../../repositories/IUserRepository";
import { prismaClient } from "../../../../../prisma/geConnection";

export class PrismaUserRepository implements IUserRepository {

  private prisma: PrismaClient = prismaClient;

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {

    const user = await this.prisma.user.create({data})
    return user;
  }
}