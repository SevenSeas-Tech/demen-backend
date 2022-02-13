import { EmployeeResponseDto } from '@accounts:dtos/employees/EmployeeResponse.dto';
import { EmployeeMap } from '@accounts:mapper/Employee.map';
import { Video } from '@lessons:entities/Video';

// ---------------------------------------------------------------------------------------------- //

interface IRequestDto {
  employee: {
    id: string;
    username: string;
    email: string;
    name: string;
    lastName: string;
    phone: string;
    videos?: Video[];
    createdAt: Date;
    updatedAt: Date;
  };
}

// ---------------------------------------------------------------------------------------------- //
export class ShowEmployeeProfileService {
  async execute(data: IRequestDto): Promise<EmployeeResponseDto> {
    const { id, username, email, name, lastName, phone, createdAt, updatedAt } = data.employee;
    const employee = {
      id,
      username,
      password: '',
      email,
      name,
      lastName,
      phone,
      videos: [],
      createdAt,
      updatedAt
    };
    return EmployeeMap.toDto(employee);
  }
}
