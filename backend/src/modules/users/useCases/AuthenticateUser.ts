import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from 'bcrypt';


interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: IRequest): Promise<Omit<User, "password" >> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      birthday: user.birthday,
      enrollment: user.enrollment,
      inviteId: user.inviteId,
      invitedById: user.invitedById,
    };
  }
}