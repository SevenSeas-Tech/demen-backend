import { inject, injectable } from 'tsyringe';

import { EmployeeResponseDto } from '@accounts:dtos/employees/EmployeeResponse.dto';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { EmployeeMap } from '@accounts:mapper/Employee.map';

// ---------------------------------------------------------------------------------------------- //

@injectable()
export class ListEmployeesService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute(): Promise<EmployeeResponseDto[]> {
    const employees = await this.employeesRepository.findAll();

    const mappedUsers = employees.map(employee => {
      return EmployeeMap.toDto(employee);
    });

    return mappedUsers;
  }
}
