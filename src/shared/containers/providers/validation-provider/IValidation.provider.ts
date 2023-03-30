import { CreateEmployeeDto } from '@accounts:dtos/employees/CreateEmployee.dto';
import { UpdateEmployeeDto } from '@accounts:dtos/employees/UpdateEmployee.dto';
import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
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
