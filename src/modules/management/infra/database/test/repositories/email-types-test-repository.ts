/* eslint-disable @typescript-eslint/require-await */
import type { EmailTypeCreationData } from '@management:dto/email-type/create';
import type { EmailTypeUpdateData } from '@management:dto/email-type/update';
import type { EmailType } from '@management:models/email-type';
import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types';

// * ---------------------------------------------------------------------- * //

class EmailTypesTestRepository implements EmailTypesRepositoryInterface {
  private readonly types: EmailType[] = [];

  async create(data: EmailTypeCreationData): Promise<EmailType> {
    const date = new Date();
    const { type } = data;

    const emailType: EmailType = {
      createdAt: date,
      updatedAt: date,
      type
    };

    this.types.push(emailType);

    return emailType;
  }

  async findByType(type: string): Promise<EmailType | undefined> {
    return this.types.find(emailType => emailType.type === type);
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
