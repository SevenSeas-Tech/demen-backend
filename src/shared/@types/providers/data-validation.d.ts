import type { ManagerCreationData } from '@management:dto/manager/create';
import type { ManagerUpdateData } from '@management:dto/manager/update';
import type { LoginCredentials } from '@management:dto/session/login';

// * ---------------------------------------------------------------------- * //

export interface DataValidationProvider {
  validateManagerLogin(credentials: LoginCredentials): Promise<boolean>;
  validateManagerCreationData(data: ManagerCreationData): Promise<boolean>;
  validateManagerUpdateData(data: ManagerUpdateData): Promise<boolean>;
}

// todo: re-implement validation provider according to new models ----------- //
