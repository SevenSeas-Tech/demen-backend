/* eslint-disable @typescript-eslint/require-await */

import type { ManagerCreationData } from '@management:dto/manager/create';
import type { FullName } from '@management:dto/manager/full-name';
import type { ManagerQueryOptions } from '@management:dto/manager/query';
import type { Email } from '@management:models/email';
import type { Manager } from '@management:models/manager';
import type { ManagersRepository } from '@management:repositories/managers';
import type { ManagerUpdateData } from '@management:dto/manager/update';

import { SharedProviderInjection } from '@shared/injection/providers';

// * ---------------------------------------------------------------------- * //

class TestManagersRepository implements ManagersRepository {
  private managers: Manager[] = [];
  private emails: Email[] = [];
  private uuidProvider = SharedProviderInjection.uuidProvider;

  private getManagerEmails(managerId: string): Email[] {
    const emails = this.emails.filter(email => email.userId === managerId);

    return emails;
  }

  // *** --- public methods --------------------------------------------- *** //

  async create(data: ManagerCreationData): Promise<Manager> {
    const { email: emailAddress, emailType, lastName, name, password } = data;

    const createdAt = new Date();
    const updatedAt = createdAt;

    const manager: Manager = {
      id: this.uuidProvider.generateV4(),
      isActive: true,
      name,
      lastName,
      password,
      createdAt,
      updatedAt
    };

    // ---------------------------------------------------------------------- //

    const email: Email = {
      id: this.uuidProvider.generateV4(),
      email: emailAddress,
      typeId: emailType,
      verified: false,
      userId: manager.id,
      createdAt,
      updatedAt
    };

    this.managers.push(manager);
    this.emails.push(email);

    return manager;
  }

  // ------------------------------------------------------------------------ //

  async update(data: ManagerUpdateData): Promise<Manager> {
    const { id } = data;

    let manager = this.managers.find(_manager => _manager.id === id) as Manager;

    // ? --- not to update with undefined --------------------------------- ? //
    const name = data.name
      ? data.name
      : manager.name;

    const lastName = data.lastName
      ? data.lastName
      : manager.lastName;

    const password = data.password
      ? data.password
      : manager.password;

    // ---------------------------------------------------------------------- //

    manager = {
      ...manager,
      name,
      lastName,
      password,
      updatedAt: new Date()
    };

    return manager;
  }

  // ------------------------------------------------------------------------ //

  async activate(id: string): Promise<Manager> {
    const manager = this.managers
      .find(_manager => _manager.id === id) as Manager;

    manager.isActive = true;

    return manager;
  }

  // ------------------------------------------------------------------------ //

  async deactivate(id: string): Promise<Manager> {
    const manager = this.managers
      .find(_manager => _manager.id === id) as Manager;

    manager.isActive = false;

    return manager;
  }

  // ------------------------------------------------------------------------ //

  async findAll(query: ManagerQueryOptions): Promise<Manager[]> {
    const { emails } = query;

    const result = this.managers.map(manager => {
      if (emails) manager.emails = this.getManagerEmails(manager.id);

      return manager;
    });

    return result;
  }

  // ------------------------------------------------------------------------ //

  async findById(id: string, _query: ManagerQueryOptions):
   Promise<Manager | undefined> {
    const manager = this.managers.find(_manager => _manager.id === id);

    return manager;
  }

  // ------------------------------------------------------------------------ //

  async findByFullName(fullName: FullName, _query: ManagerQueryOptions):
   Promise<Manager[]> {
    const { name, lastName } = fullName;

    const managers = this.managers
      .filter(manager => manager.name === name && manager.lastName === lastName);

    return managers;
  }
}

// * ---------------------------------------------------------------------- * //

export { TestManagersRepository };
