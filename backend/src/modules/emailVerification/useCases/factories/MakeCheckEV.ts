import { EmailVerificationPrismaRepository } from "../../infra/http/repositories/EmailVerificationPrismaRepository";
import { CheckEV } from "../CheckEV";



export default function MakeCheckEV() {
  const emailVerificationRepository = new EmailVerificationPrismaRepository();
  return new CheckEV(emailVerificationRepository);
}