import type { EmailCreationData } from '@management:dto/email/create';
import type { Email } from '@management:models/email';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface EmailsRepository {
  create(data: EmailCreationData): Promise<Email>;
  delete(email: string): Promise<void>;
  update(email: string, updatedEmail: string): Promise<Email>;
  findByEmail(email: string): Promise<Email | undefined>;
  findByUser(userId: Uuid): Promise<Email[]>;
}
