
export interface IEmailVerificationRepository {
  create(email: string, token: number): Promise<void>;
  checkEmailVerification(email: string, token: number): Promise<Boolean>;
  countAttempts(email: string): Promise<number>;
}