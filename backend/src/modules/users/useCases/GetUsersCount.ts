import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/IUserRepository";

export class GetUsersCount {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<{totalUsers: number}> {
    const userCount = await this.userRepository.userCount();

 

    return {
      totalUsers: userCount
    };
  }
}