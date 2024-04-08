import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from 'bcrypt';

interface IRequest
{
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  receivedInviteId?:number | null;
  enrollment: string;
}

export class CreateUser
{
  constructor(private userRepository: IUserRepository)
  {
  }

  async execute({ name, email, password, dateOfBirth,receivedInviteId, enrollment }: IRequest): Promise<User>
  {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists)
    {
      throw new Error('User already exists');
    }

    const domain = email.split("@")[1]

    if (domain !== "aluno.unb.br" && domain !== "unb.br") {
      throw new Error("Cannot create e-mail from outside UnB.")
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000)
    const inviteId = Math.floor(1000 + Math.random() * 9000)

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCount = await this.userRepository.userCount();

    if(userCount >= 10)
    {
      if(receivedInviteId)
        {
          const userWithInviteId = await this.userRepository.findByInviteId(receivedInviteId);
    
          if(!userWithInviteId)
          {
            throw new Error('Invite ID does not exist');
          }


          console.log({name, email, password: hashedPassword, birthday:dateOfBirth, inviteId, enrollment, invitedById: userWithInviteId.id})
          const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            birthday:dateOfBirth,
            inviteId,
            enrollment,
            invitedById: userWithInviteId.id
          });

          await this.userRepository.addFriend(userWithInviteId.id, user.id);
          return user;
        }

    }
    
    console.log({name, email, password: hashedPassword, birthday:dateOfBirth, inviteId, enrollment})
    const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        birthday:dateOfBirth,
        inviteId,
        enrollment
    });

    return user;
  }
}