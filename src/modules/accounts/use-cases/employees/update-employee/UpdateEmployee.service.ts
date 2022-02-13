import { inject, injectable } from 'tsyringe';

import { UpdateEmployeeDto } from '@accounts:dtos/employees/UpdateEmployee.dto';
import { InvalidDataError } from '@accounts:errors/InvalidData.error';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { IValidationProvider } from '@shared:providers/validation-provider/IValidation.provider';

// ---------------------------------------------------------------------------------------------- //

@injectable()
export class UpdateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('ValidationProvider')
    private validationProvider: IValidationProvider
  ) {}

  async execute(data: UpdateEmployeeDto): Promise<void> {
    const { id, name, lastName } = data;

    // ------------------------------------------------------------------------------------------ //

    const isValid = await this.validationProvider.validateEmployeeUpdateData(data);

    if (!isValid) {
      throw new InvalidDataError();
    }

    // ------------------------------------------------------------------------------------------ //

    await this.employeesRepository.update({
      id,
      name: name.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase()
    });
  }
}
