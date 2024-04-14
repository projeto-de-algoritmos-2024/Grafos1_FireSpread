import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from 'bcrypt';
import { NotFoundError } from "../../../shared/errors/NotFoundError";


interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: IRequest): Promise<Omit<User, "password"> & { friendsCount: number }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("Email ou senha incorretos!");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new NotFoundError("Email ou senha incorretos!");
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
      friendsCount,
    };
  }
}