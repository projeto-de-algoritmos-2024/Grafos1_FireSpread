import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  id: string;
  inviteId: number;
}

export class AddFriend {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id, inviteId }: IRequest): Promise<Boolean> {

    const added = await this.userRepository.addFriend(id, inviteId);

    return added;
  }
}