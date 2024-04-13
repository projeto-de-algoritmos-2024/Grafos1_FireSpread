import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  id: string;
}

export class GetUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: IRequest): Promise<Omit<User, "password" > & { friendsCount: number } > {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const friendsCount = await this.userRepository.countFriends(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      birthday: user.birthday,
      enrollment: user.enrollment,
      inviteId: user.inviteId,
      invitedById: user.invitedById,
      friendsCount
    };
  }
}