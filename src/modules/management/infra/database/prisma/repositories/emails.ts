import { PrismaDatabase } from '@shared/infra/database/prisma/prisma-database';

import type {
  EmailCreateInput,
  EmailDelegate,
  EmailInclude,
  EmailUpdateInput,
  EmailWhereInput,
  EmailWhereUniqueInput
} from '@management:database-types/prisma/email/email';
import type { EmailCreationData } from '@management:dto/email/create';
import type { EmailListQuery } from '@management:dto/email/list';
import type { Email } from '@management:models/email';
import type { EmailsRepository } from '@management:repositories/emails';

// * ---------------------------------------------------------------------- * //

class PrismaEmailsRepository implements EmailsRepository {
  private repository: EmailDelegate;
  private include: EmailInclude = { user: true };

  // ------------------------------------------------------------------------ //

  constructor() {
    const prisma = PrismaDatabase.getInstance();
    this.repository = prisma.client.email;
  }

  // *** --- methods ---------------------------------------------------- *** //

  async create(_data: EmailCreationData): Promise<Email> {
    const { email: emailAddress, typeId, userId } = _data;

    const data: EmailCreateInput = {
      email: emailAddress,
      user: { connect: { id: userId } },
      emailType: { connect: { type: typeId } }
    };

    const email = await this.repository.create({ data });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async delete(email: string): Promise<void> {
    const where: EmailWhereUniqueInput = { email };

    void await this.repository.delete({ where });

    return;
  }

  // ------------------------------------------------------------------------ //

  async update(emailAddress: string, updatedAddress: string): Promise<Email> {
    const where: EmailWhereUniqueInput = { email: emailAddress };

    const data: EmailUpdateInput = { email: updatedAddress };

    const email = await this.repository.update({ where, data });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async setAsVerified(emailAddress: string): Promise<Email> {
    const where: EmailWhereUniqueInput = { email: emailAddress };

    const data: EmailUpdateInput = { verified: true };

    const email = await this.repository.update({ where, data });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async findByEmail(emailAddress: string): Promise<Email | undefined> {
    const where: EmailWhereUniqueInput = { email: emailAddress };

    const email = await this.repository
      .findUnique({ where, include: this.include });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async list(data: EmailListQuery ): Promise<Email[]> {
    const { userId, typeId } = data;

    const where: EmailWhereInput = { AND: [ { userId }, { typeId } ] };

    const emails = await this.repository
      .findMany({ where, include: this.include });

    return emails as Email[];
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaEmailsRepository };
