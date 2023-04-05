import type { Email } from '@management:models/email';

// * ---------------------------------------------------------------------- * //

export interface EmailsRepository {
  findOne(email: string): Promise<Email | undefined>;
}
