import { NodemailerMailAdapter } from "../../../../shared/adapters/nodemailer/nodemailer-mail-adapter";
import { EmailVerificationPrismaRepository } from "../../infra/http/repositories/EmailVerificationPrismaRepository";
import { CreateEV } from "../CreateEV";


export function MakeCreateEV() {
  const emailVerificationRepository = new EmailVerificationPrismaRepository();
  const nodeMailerMailAdapter = new NodemailerMailAdapter();
  return new CreateEV(emailVerificationRepository,nodeMailerMailAdapter);
}