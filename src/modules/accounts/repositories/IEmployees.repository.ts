import { CreateEmployeeDto } from '@accounts:dtos/employees/CreateEmployee.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { Employee } from '@accounts:entities/Employee';
import { Email } from '@accounts:types/users/User';
import { Uuid } from '@shared/@types/Uuid';

// ---------------------------------------------------------------------------------------------- //

export interface IEmployeesRepository {
  create(data: CreateEmployeeDto): Promise<Employee>;
  findAll(): Promise<Employee[]>;
  findById(id: Uuid): Promise<Employee | undefined>;
  findByEmail(email: Email): Promise<Employee | undefined>;
  findByUsername(username: string): Promise<Employee | undefined>;
  update(data: UpdateUserDto): Promise<Employee>;
}
