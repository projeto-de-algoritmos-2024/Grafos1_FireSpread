import { IMailAdapter } from "../../../shared/adapters/mail-adapter";
import { BadRequestError } from "../../../shared/errors/BadRequestError";
import { ConflictError } from "../../../shared/errors/ConflictError";
import { IEmailVerificationRepository } from "../repositories/IEmailVerificationRepository";



export class CreateEV {
  constructor(
    private emailVerificationRepository: IEmailVerificationRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute(email: string): Promise<void> {

    const domain = email.split("@")[1]

    if (domain !== "aluno.unb.br" && domain !== "unb.br") {
      throw new ConflictError("Email inválido. Utilize um email institucional da UnB.")
    }

    const attempts = await this.emailVerificationRepository.countAttempts(email);

    if (attempts >= 5) {
      throw new ConflictError("Tentativas de mais!!!");
    }
    
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    await this.emailVerificationRepository.create(email, verificationCode);


    await this.mailAdapter.sendMail!({
      subject: "Seu código de verificação do Fire Spread!",
      body: [
        "<body style=\"background-color: #1E213A; padding: 50px; color: #ffffff\">",
        "<div style=\"text-align: center;\">",
        `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 50px;">Você está a um passo de criar sua conta!</h1>`,
        "<h2>Seu código de verificação é:</h2>",
        `<h2><strong>${verificationCode}</strong></h2>`,
        "</div>",
        "</body>",
      ].join("\n"),
      user_email: email
    })


  }
}