import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { EmployeeResponseDto } from '@accounts:dtos/employees/EmployeeResponse.dto';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { EmployeeMap } from '@accounts:mapper/Employee.map';
import { NotFoundError } from '@shared/infra/http/middlewares/errors/NotFound.error';

// ---------------------------------------------------------------------------------------------- //

interface IRequestDto {
  id: string;
}

// ---------------------------------------------------------------------------------------------- //
@injectable()
export class ShowEmployeeProfileService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute(data: IRequestDto): Promise<EmployeeResponseDto> {
    const { id } = data;

    const isUuid = validate(id);

    if (!isUuid) {
      throw new NotFoundError();
    }

    const employee = await this.employeesRepository.findById(id);

    if (!employee) {
      throw new NotFoundError();
    }

    return EmployeeMap.toDto(employee);
  }
}
