import type { EmailsRepository } from '@management:repositories/emails';
import type { Email } from '@management:models/email';
import type { EmailCreationData } from '@management:dto/email/create';
import type {
  EmailDelegate,
  EmailInclude,
  EmailUpdateInput,
  EmailWhereInput,
  EmailWhereUniqueInput
} from '@management:database-types/prisma/email';

import { PrismaDatabase } from '@shared/infra/database/prisma/prisma-database';

// * ---------------------------------------------------------------------- * //

class PrismaEmailsRepository implements EmailsRepository {
  private repository: EmailDelegate = PrismaDatabase.getInstance().client.email;
  private include: EmailInclude = { user: true };

  // *** --- methods ---------------------------------------------------- *** //

  async create(data: EmailCreationData): Promise<Email> {
    const email = await this.repository.create({ data });

    return email;
  }

  // ------------------------------------------------------------------------ //

  async delete(email: string): Promise<void> {
    const where: EmailWhereUniqueInput = { email };

    await this.repository.delete({ where });

    return;
  }

  // ------------------------------------------------------------------------ //

  async update(emailAddress: string, updatedAddress: string): Promise<Email> {
    const where: EmailWhereUniqueInput = { email: emailAddress };

    const data: EmailUpdateInput = { email: updatedAddress };

    const email = await this.repository.update({ where, data });

    return email;
  }

  // ------------------------------------------------------------------------ //

  async setAsVerified(emailAddress: string): Promise<Email> {
    const where: EmailWhereUniqueInput = { email: emailAddress };

    const data: EmailUpdateInput = { verified: true };

    const email = await this.repository.update({ where, data });

    return email;
  }

  // ------------------------------------------------------------------------ //

  async findByEmail(address: string): Promise<Email | undefined> {
    const where: EmailWhereUniqueInput = { email: address };

    const email = await this.repository
      .findUnique({ where, include: this.include });

    return email as Email;
  }

  // ------------------------------------------------------------------------ //

  async findByUser(userId: string): Promise<Email[]> {
    const where: EmailWhereInput = { userId };

    const emails = await this.repository
      .findMany({ where, include: this.include });

    return emails;
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaEmailsRepository };
