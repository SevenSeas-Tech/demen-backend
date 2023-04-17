import type { EmailType } from '@management:models/email-type';
import type { EmailTypeCreationData } from '@management:dto/email-type/create';
import type { EmailTypeUpdateData } from '@management:dto/email-type/update';

// * ---------------------------------------------------------------------- * //

interface EmailTypesRepository {
  create(data: EmailTypeCreationData): Promise<EmailType>;
  findByType(type: string): Promise<EmailType | undefined>;
  update(data: EmailTypeUpdateData): Promise<EmailType>;
  delete(type: string): Promise<void>;
}

// * ---------------------------------------------------------------------- * //

export type { EmailTypesRepository };
