import { EmployeeResponseDto } from '@accounts:dtos/users/EmployeeResponse.dto';
import { Employee } from '@accounts:entities/Employee';

class EmployeeMap {
  static toDto({
    id,
    username,
    email,
    name,
    lastName,
    // verified,
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
      // verified,
      phone,
      createdAt,
      updatedAt
    };

    return employee;
  }
}

export { EmployeeMap };