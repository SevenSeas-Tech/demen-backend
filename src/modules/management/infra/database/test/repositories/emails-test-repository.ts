/* eslint-disable @typescript-eslint/require-await */

import type { EmailCreationData } from '@management:dto/email/email-creation-data';
import type { EmailListQuery } from '@management:dto/email/email-list-query';
import type { Email } from '@management:models/email';
import type { EmailsRepositoryInterface } from '@management:repositories/emails-repository';

// * ---------------------------------------------------------------------- * //

class EmailsTestRepository implements EmailsRepositoryInterface {
  private readonly emails: Email[] = [];

  async create(data: EmailCreationData): Promise<Email> {
    const { address, type, userId } = data;

    const email: Email = {
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
      verified: false,
      userId,
      type
    };

    this.emails.push(email);

    return email;
  }

  delete(_email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(_email: string, _updatedEmail: string): Promise<Email> {
    throw new Error('Method not implemented.');
  }
  setAsVerified(_email: string): Promise<Email> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(address: string): Promise<Email | undefined> {
    return this.emails.find(email => email.address == address);
  }

  list(_data: EmailListQuery): Promise<Email[]> {
    throw new Error('Method not implemented.');
  }
}

// * ---------------------------------------------------------------------- * //

export { EmailsTestRepository };
