import { CreateEmployeeDto } from '@accounts:dtos/users/CreateEmployee.dto';
import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UpdateEmployeeDto } from '@accounts:dtos/users/UpdateEmployee.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { LoginCredentials } from '@accounts:types/sessions/Sessions';

// ---------------------------------------------------------------------------------------------- //

export interface IValidationProvider {
  validateLogin(credentials: LoginCredentials): Promise<boolean>;

  validateEmployeeCreationData(employeeData: CreateEmployeeDto): Promise<boolean>;
  validateEmployeeUpdateData(data: UpdateEmployeeDto): Promise<boolean>;

  validateUserCreationData(userData: CreateUserDto): Promise<boolean>;
  validateUserUpdateData(data: UpdateUserDto): Promise<boolean>;
}
