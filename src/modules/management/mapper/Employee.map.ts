import { EmployeeResponseDto } from '@accounts:dtos/employees/EmployeeResponse.dto';
import { Employee } from '@accounts:entities/Employee';

export class EmployeeMap {
  static toDto({
    id,
    username,
    email,
    name,
    lastName,
    phone,
    createdAt,
    updatedAt
  }: Employee): EmployeeResponseDto {
    const employee = {
      id,
      username,
      email,
      name,
      lastName,
      phone,
      createdAt,
      updatedAt
    };

    return employee;
  }
}
