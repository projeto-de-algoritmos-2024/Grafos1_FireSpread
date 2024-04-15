import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from 'bcrypt';
import { ConflictError } from "../../../shared/errors/ConflictError";
import allowedEmailDomains from "../../../shared/utils/allowedDomains";


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
  constructor(
    private userRepository: IUserRepository,
  
  )
  {
  }

  async execute({ name, email, password, dateOfBirth,receivedInviteId, enrollment }: IRequest): Promise<User>
  {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists)
    {
      throw new ConflictError('Usuário já existe.');
    }

    const domain = email.split("@")[1]

    if (allowedEmailDomains.includes(domain) === false){
      throw new ConflictError("Email inválido. Utilize um email institucional.")
    }



    
    let inviteId = Math.floor(1000 + Math.random() * 9000);
    
    const inviteIdAlreadyExists = await this.userRepository.findByInviteId(inviteId);

    while(inviteIdAlreadyExists)
    {
      inviteId = Math.floor(1000 + Math.random() * 9000);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCount = await this.userRepository.userCount();

    if(userCount >= 1)
    {
      if(receivedInviteId)
        {
          const userWithInviteId = await this.userRepository.findByInviteId(receivedInviteId);
    
          if(!userWithInviteId)
          {
            throw new ConflictError('ID de convite invalido.');
          }


          const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            birthday:dateOfBirth,
            inviteId,
            enrollment,
            invitedById: userWithInviteId.id
          });

          await this.userRepository.addFriend(userWithInviteId.id, receivedInviteId);
          return user;
        }

    }
    
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