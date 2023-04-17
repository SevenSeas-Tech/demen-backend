import type { EmailType } from '@management:models/email-type';

// * ---------------------------------------------------------------------- * //

interface EmailTypesRepository {
  create(data: EmailTypeCreationData): Promise<EmailType>;
  findByType(type: string): Promise<EmailType | undefined>;
  update(type: string): Promise<EmailType>;
  delete(type: string): Promise<void>;
}

// * ---------------------------------------------------------------------- * //

export type { EmailTypesRepository };
