import type { ManagerCreationData } from '@management:dto/manager/create';
import type { FullName } from '@management:dto/manager/full-name';
import type { ManagerQueryOptions } from '@management:dto/manager/query';
import type { ManagerUpdateData } from '@management:dto/manager/update';
import type { Manager } from '@management:models/manager';
import type { ManagersRepository } from '@management:repositories/managers';
import type { Uuid } from '@types';
import type {
  EmailNestedInput,
  EmailTypeNestedInput
} from '@management:database-types/prisma/email/email';
import type {
  ManagerWhereInput,
  ManagerUpdateInput,
  ManagerWhereUniqueInput,
  ManagerInclude,
  ManagerCreateInput,
  ManagerDelegate
} from '@management:database-types/prisma/manager';

import { PrismaDatabase } from '@shared/infra/database/prisma/prisma-database';

// * ---------------------------------------------------------------------- * //

class PrismaManagersRepository implements ManagersRepository {
  private repository: ManagerDelegate;

  // *** --- interns ---------------------------------------------------- *** //

  constructor() {
    const prisma = PrismaDatabase.getInstance();
    this.repository = prisma.client.manager;
  }

  // ------------------------------------------------------------------------ //

  private handleQueryData(query: ManagerQueryOptions): ManagerInclude {
    const { emails, issues, phones, tokens, videos } = query;

    const include: ManagerInclude = {
      issues,
      phones,
      tokens,
      videos,
      emails: emails
        ? { include: { emailType: true } }
        : false
    };

    return include;
  }

  // *** --- methods ---------------------------------------------------- *** //

  async create(data: ManagerCreationData): Promise<Manager> {
    const { lastName, name, password, isActive, email, emailType:type } = data;

    const emailType: EmailTypeNestedInput = {
      connect: { type }
    };

    const emails: EmailNestedInput = {
      create: { email, emailType }
    };

    const prismaData: ManagerCreateInput = {
      name,
      lastName,
      password,
      isActive,
      emails
    };

    const manager = await this.repository.create({ data: prismaData });

    return manager as Manager;
  }

  // ------------------------------------------------------------------------ //

  async update(id: Uuid, data: ManagerUpdateData): Promise<Manager> {
    const where: ManagerWhereUniqueInput = { id };

    const prismaData: ManagerUpdateInput = data;

    const manager = await this.repository.update({ where, data: prismaData });

    return manager as Manager;
  }

  // ------------------------------------------------------------------------ //

  async activate(id: Uuid): Promise<Manager> {
    const where: ManagerWhereUniqueInput = {
      id
    };

    const data: ManagerUpdateInput = {
      isActive: true
    };

    const manager = await this.repository.update({
      where,
      data
    });

    return manager as Manager;
  }

  // ------------------------------------------------------------------------ //

  async deactivate(id: Uuid): Promise<Manager> {
    const where: ManagerWhereUniqueInput = { id };

    const data: ManagerUpdateInput = { isActive: false };

    const manager = await this.repository.update({ where, data });

    return manager as Manager;
  }

  // ------------------------------------------------------------------------ //

  async findAll(query: ManagerQueryOptions): Promise<Manager[]> {
    const include: ManagerInclude = this.handleQueryData(query);

    const managers = await this.repository.findMany({ include });

    return managers as Manager[];
  }

  // ------------------------------------------------------------------------ //

  async findById(id: string, query: ManagerQueryOptions): Promise<Manager> {
    const where: ManagerWhereUniqueInput = { id };

    const include: ManagerInclude = this.handleQueryData(query);

    const manager = await this.repository.findUnique({ where, include });

    return manager as Manager;
  }

  // ------------------------------------------------------------------------ //

  async findByFullName(fullName: FullName, query: ManagerQueryOptions):
   Promise<Manager[]> {
    const { name, lastName } = fullName;

    const where: ManagerWhereInput = { name, lastName };

    const include: ManagerInclude = this.handleQueryData(query);

    const managers = await this.repository.findMany({ where, include });

    return managers as Manager[];
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaManagersRepository };
