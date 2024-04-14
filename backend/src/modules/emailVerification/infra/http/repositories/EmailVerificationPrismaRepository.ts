import { PrismaClient } from "@prisma/client";
import { IEmailVerificationRepository } from "../../../repositories/IEmailVerificationRepository";
import { prismaClient } from "../../../../../../prisma/geConnection";


export class EmailVerificationPrismaRepository implements IEmailVerificationRepository {

  private prisma: PrismaClient = prismaClient;

  async create(email: string, token: number): Promise<void> {
    await this.prisma.emailVerification.create({
      data: {
        email,
        token,
      },
    });

  }

  async checkEmailVerification(email: string, token: number): Promise<Boolean> {
    const emailVerification = await this.prisma.emailVerification.findFirst({
      where: {
        email,
        token,
      },
    });
    return emailVerification ? true : false;
  }

  async countAttempts(email: string): Promise<number> {
    const attempts = await this.prisma.emailVerification.count({
      where: {
        email,
      },
    });
    return attempts;
  }
}