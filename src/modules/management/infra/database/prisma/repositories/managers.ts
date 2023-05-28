import { PrismaDatabase } from '@shared/infra/database/prisma/prisma-database';

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
import type { FullName } from '@management:dto/manager/full-name';
import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { ManagerQueryOptions } from '@management:dto/manager/query';
import type { ManagerUpdateData } from '@management:dto/manager/update';
import type { Manager } from '@management:models/manager';
import type { ManagersRepositoryInterface } from '@management:repositories/managers';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

class PrismaManagersRepository implements ManagersRepositoryInterface {
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

  async create(_data: ManagerCreationData): Promise<Manager> {
    const { surname, name, password, isActive, emailAddress, emailType:type } = _data;

    const emailType: EmailTypeNestedInput = {
      connect: { type }
    };

    const emails: EmailNestedInput = {
      create: { address: emailAddress, emailType }
    };

    const data: ManagerCreateInput = {
      name,
      surname,
      password,
      isActive,
      emails
    };

    const manager = await this.repository.create({ data });

    return manager as Manager;
  }

  // ------------------------------------------------------------------------ //

  async update(_data: ManagerUpdateData): Promise<Manager> {
    const { id } = _data;

    const where: ManagerWhereUniqueInput = { id };

    const data: ManagerUpdateInput = _data;

    const manager = await this.repository.update({ where, data });

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
    const { name, surname } = fullName;

    const where: ManagerWhereInput = { name, surname };

    const include: ManagerInclude = this.handleQueryData(query);

    const managers = await this.repository.findMany({ where, include });

    return managers as Manager[];
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaManagersRepository };
