import { CreateEmployeeDto } from '@accounts:dtos/employees/CreateEmployee.dto';
import { UpdateEmployeeDto } from '@accounts:dtos/employees/UpdateEmployee.dto';
import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { EmployeeCredentials } from '@accounts:types/sessions/Sessions';

import { IValidationProvider } from './IValidation.provider';

export class FakeValidationProvider implements IValidationProvider {
  async validateLogin(_: EmployeeCredentials): Promise<boolean> {
    return true;
  }

  async validateEmployeeCreationData(_: CreateEmployeeDto): Promise<boolean> {
    return true;
  }

  async validateEmployeeUpdateData(_: UpdateEmployeeDto): Promise<boolean> {
    return true;
  }

  async validateUserCreationData(_: CreateUserDto): Promise<boolean> {
    return true;
  }

  async validateUserUpdateData(_: UpdateUserDto): Promise<boolean> {
    return true;
  }
}
