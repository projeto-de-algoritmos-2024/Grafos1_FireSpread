import { IUserRepository } from "../repositories/IUserRepository";

export class LuckyUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<{lucky: Boolean}> {
    let baseDivisor = 1;

    const userCount = await this.userRepository.userCount();

    if (userCount > 0) {
      baseDivisor = userCount;
    }

    const lucky = Math.random() < 1 / baseDivisor;


    return {
      lucky: lucky
    };
  }
}