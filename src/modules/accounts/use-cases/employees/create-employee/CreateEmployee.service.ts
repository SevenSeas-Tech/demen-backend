import { inject, injectable } from 'tsyringe';

import { CreateEmployeeDto } from '@accounts:dtos/employees/CreateEmployee.dto';
import { EmployeeResponseDto } from '@accounts:dtos/employees/EmployeeResponse.dto';
import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { InvalidDataError } from '@accounts:errors/InvalidData.error';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { EmployeeMap } from '@accounts:mapper/Employee.map';
import { IHashProvider } from '@shared/containers/providers/hash-provider/IHash.provider';
import { IValidationProvider } from '@shared/containers/providers/validation-provider/IValidation.provider';

import { UsernameTakenError } from './errors/UsernameTaken.error';

// ---------------------------------------------------------------------------------------------- //
@injectable()
export class CreateEmployeeService {
  constructor(
    @inject('UsersRepository')
    private employeesRepository: IEmployeesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ValidationProvider')
    private validationProvider: IValidationProvider
  ) {}

  async execute(data: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const isValid = await this.validationProvider.validateEmployeeCreationData(data);

    if (!isValid) {
      throw new InvalidDataError();
    }

    const { username, email, name, lastName, password, phone } = data;

    // ------------------------------------------------------------------------------------------ //
    const findByUsername = await this.employeesRepository.findByUsername(username);

    if (findByUsername) {
      throw new UsernameTakenError();
    }

    const findByEmail = await this.employeesRepository.findByEmail(email);

    if (findByEmail) {
      throw new EmailInUseError();
    }

    const passwordHash = await this.hashProvider.hash(password);

    const employee = await this.employeesRepository.create({
      username: username.trim(),
      email,
      name: name.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
      password: passwordHash,
      phone
    });

    return EmployeeMap.toDto(employee);
  }
}
