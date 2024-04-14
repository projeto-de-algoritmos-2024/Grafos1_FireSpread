import { BadRequestError } from "../../../shared/errors/BadRequestError";
import { ConflictError } from "../../../shared/errors/ConflictError";
import { IEmailVerificationRepository } from "../repositories/IEmailVerificationRepository";



export class CheckEV {
  constructor(private emailVerificationRepository: IEmailVerificationRepository) {}

  async execute(email: string, code: number): Promise<void> {

    const check = await this.emailVerificationRepository.checkEmailVerification(email,code);

    if (!check) {
      throw new BadRequestError("Código de verificação inválido");
    }


  }
}