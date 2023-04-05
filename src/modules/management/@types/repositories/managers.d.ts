import type { Manager } from '@management:models/manager';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface ManagersRepository {
  create(data: CreateUserDto): Promise<Manager>;
  findAll(): Promise<Manager[]>;
  findById(id: Uuid): Promise<Manager | undefined>;
  findByFullName(name: string, lastName: string): Promise<Manager[]>;
  findByEmail(email: string): Promise<Manager | undefined>;
  update(data: UpdateUserDto): Promise<Manager>;
}
