import type { EmailTypeCreationData } from '@management:dto/email-type/create';
import type { EmailTypeUpdateData } from '@management:dto/email-type/update';
import type { EmailType } from '@management:models/email-type';
import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types';

// * ---------------------------------------------------------------------- * //

class EmailTypesTestRepository implements EmailTypesRepositoryInterface {
  create(_data: EmailTypeCreationData): Promise<EmailType> {
    throw new Error('Method not implemented.');
  }
  findByType(_type: string): Promise<EmailType | undefined> {
    throw new Error('Method not implemented.');
  }
  update(_data: EmailTypeUpdateData): Promise<EmailType> {
    throw new Error('Method not implemented.');
  }
  delete(_type: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

// * ---------------------------------------------------------------------- * //

export { EmailTypesTestRepository };
