import type { EmailCreationData } from '@management:dto/email/create';
import type { EmailListQuery } from '@management:dto/email/list';
import type { Email } from '@management:models/email';

// * ---------------------------------------------------------------------- * //

export interface EmailsRepositoryInterface {
  create(data: EmailCreationData): Promise<Email>;
  delete(email: string): Promise<void>;
  update(email: string, updatedEmail: string): Promise<Email>;
  setAsVerified(email: string): Promise<Email>;
  findByEmail(email: string): Promise<Email | undefined>;
  list(data: EmailListQuery): Promise<Email[]>;

  // *** --- throwers --------------------------------------------------- *** //
  emailIsAvailableOrThrow(emailAddress: string): Promise<boolean>;
}
