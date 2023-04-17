/* eslint-disable @typescript-eslint/require-await */

import type { DataValidationProvider } from '@shared/@types/providers/data-validation';
import type { ManagerCreationData } from '@management:dto/manager/create';
import type { ManagerUpdateData } from '@management:dto/manager/update';
import type { LoginCredentials } from '@management:dto/session/login';

// * ---------------------------------------------------------------------- * //

class TestDataValidationProvider implements DataValidationProvider {
  async validateManagerLogin(_credentials: LoginCredentials): Promise<boolean> {
    return true;
  }

  // ------------------------------------------------------------------------ //

  async validateManagerCreationData(_data: ManagerCreationData):
   Promise<boolean> {
    return true;
  }

  // ------------------------------------------------------------------------ //

  async validateManagerUpdateData(_data: ManagerUpdateData): Promise<boolean> {
    return true;
  }
}

// * ---------------------------------------------------------------------- * //

export { TestDataValidationProvider };
