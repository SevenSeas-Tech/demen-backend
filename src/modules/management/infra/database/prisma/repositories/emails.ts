import { PrismaDatabase } from '@shared/infra/database/prisma/prisma-database';

import type {
  EmailCreateInput,
  EmailDelegate,
  EmailInclude,
  EmailUpdateInput,
  EmailWhereInput,
  EmailWhereUniqueInput
} from '@management:database-types/prisma/email/email';
import type { EmailCreationData } from '@management:dto/email/email-creation-data';
import type { EmailListQuery } from '@management:dto/email/email-list-query';
import type { Email } from '@management:models/email';
import type { EmailsRepositoryInterface } from '@management:repositories/emails-repository';

// * ---------------------------------------------------------------------- * //

class PrismaEmailsRepository implements EmailsRepositoryInterface {
  private repository: EmailDelegate;
  private include: EmailInclude = { user: true };

  // ------------------------------------------------------------------------ //

  constructor() {
    const prisma = PrismaDatabase.getInstance();
    this.repository = prisma.client.email;
  }

  // *** --- methods ---------------------------------------------------- *** //

  async create(_data: EmailCreationData): Promise<Email> {
    const { address, type, userId } = _data;

    const data: EmailCreateInput = {
      address,
      user: { connect: { id: userId } },
      emailType: { connect: { type: type } }
    };

    const email = await this.repository.create({ data });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async delete(address: string): Promise<void> {
    const where: EmailWhereUniqueInput = { address };

    void await this.repository.delete({ where });

    return;
  }

  // ------------------------------------------------------------------------ //

  async update(address: string, updatedAddress: string): Promise<Email> {
    const where: EmailWhereUniqueInput = { address };

    const data: EmailUpdateInput = { address: updatedAddress };

    const email = await this.repository.update({ where, data });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async setAsVerified(address: string): Promise<Email> {
    const where: EmailWhereUniqueInput = { address };

    const data: EmailUpdateInput = { verified: true };

    const email = await this.repository.update({ where, data });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async findByEmail(address: string): Promise<Email | undefined> {
    const where: EmailWhereUniqueInput = { address };

    const email = await this.repository
      .findUnique({ where, include: this.include });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async list(data: EmailListQuery ): Promise<Email[]> {
    const { userId, type } = data;

    const where: EmailWhereInput = { AND: [ { userId }, { type } ] };

    const emails = await this.repository
      .findMany({ where, include: this.include });

    return emails as Email[];
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaEmailsRepository };
