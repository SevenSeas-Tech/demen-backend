import type { ManagerCreationData } from '@management:dto/manager/create';
import type { FullName } from '@management:dto/manager/full-name';
import type { ManagerQueryOptions } from '@management:dto/manager/query';
import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface ManagersRepository {
  create(data: ManagerCreationData): Promise<Manager>;
  update(id: Uuid, data: ManagerUpdateData): Promise<Manager>;
  activate(id: Uuid): Promise<Manager>;
  deactivate(id: Uuid): Promise<Manager>;

  // *** --- read ------------------------------------------------------  *** //
  findAll(query: ManagerQueryOptions): Promise<Manager[]>;
  findById(id: Uuid, query: ManagerQueryOptions): Promise<Manager | undefined>;
  findByFullName(fullName: FullName, query: ManagerQueryOptions): Promise<Manager[]>;
}
