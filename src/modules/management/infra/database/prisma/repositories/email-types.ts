
import { PrismaDatabase } from '@shared/infra/database/prisma/prisma-database';

import type {
  EmailTypeCreateInput,
  EmailTypeDelegate,
  EmailTypeUpdateInput,
  EmailTypeWhereUniqueInput
} from '@management:database-types/prisma/email/type';
import type { EmailTypeCreationData } from '@management:dto/email-type/create';
import type { EmailTypeUpdateData } from '@management:dto/email-type/update';
import type { EmailType } from '@management:models/email-type';
import type { EmailTypesRepositoryInterface } from '@management:repositories/email-types';

// * ---------------------------------------------------------------------- * //

class PrismaEmailTypesRepository implements EmailTypesRepositoryInterface {
  private repository: EmailTypeDelegate;

  constructor() {
    const prisma = PrismaDatabase.getInstance();
    this.repository = prisma.client.emailType;
  }

  // *** --- public methods --------------------------------------------- *** //

  async create(_data: EmailTypeCreationData): Promise<EmailType> {
    const { type } = _data;

    const data: EmailTypeCreateInput = { type };

    const emailType = await this.repository.create({ data });

    return emailType;
  }

  // ------------------------------------------------------------------------ //

  async findByType(type: string): Promise<EmailType | undefined> {
    const where: EmailTypeWhereUniqueInput = { type };

    const emailType = await this.repository.findUnique({ where });

    return emailType as EmailType;
  }

  // ------------------------------------------------------------------------ //

  async update(_data: EmailTypeUpdateData): Promise<EmailType> {
    const { type, updatedType } = _data;

    const data: EmailTypeUpdateInput = { type: updatedType };

    const where: EmailTypeWhereUniqueInput = { type };

    const emailType = await this.repository.update({ where, data });

    return emailType;
  }

  // ------------------------------------------------------------------------ //

  async delete(type: string): Promise<void> {
    const where: EmailTypeWhereUniqueInput = { type };

    void await this.repository.delete({ where });

    return;
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaEmailTypesRepository };
