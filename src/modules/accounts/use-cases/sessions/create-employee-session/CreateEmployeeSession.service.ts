import { inject, injectable } from 'tsyringe';

import { ITokenProvider } from '@accounts:containers/providers/token-provider/IToken.provider';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { EmployeeMap } from '@accounts:mapper/Employee.map';
import { EmployeeCredentials, EmployeeSessionResponse } from '@accounts:types/sessions/Sessions';
import { InvalidCredentialsError } from '@accounts:use-cases/sessions/errors/InvalidCredentials.error';
import { IHashProvider } from '@shared/containers/providers/hash-provider/IHash.provider';
import { IValidationProvider } from '@shared/containers/providers/validation-provider/IValidation.provider';

// ---------------------------------------------------------------------------------------------- //

@injectable()
export class CreateEmployeeSessionService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,

    @inject('TokenProvider')
    private TokenProvider: ITokenProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ValidationProvider')
    private validationProvider: IValidationProvider
  ) {}

  async execute(data: EmployeeCredentials): Promise<EmployeeSessionResponse> {
    const isValid = await this.validationProvider.validateLogin(data);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const { email, password } = data;

    const employee = await this.employeesRepository.findByEmail(email);

    if (!employee) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await this.hashProvider.match(password, employee.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const { id } = employee;
    const token = this.TokenProvider.sign({ id, email }, 'jwt');

    const response = {
      employee: EmployeeMap.toDto(employee),
      token
    };

    return response;
  }
}
