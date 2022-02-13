import { inject, injectable } from 'tsyringe';

import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { InvalidDataError } from '@accounts:errors/InvalidData.error';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { IValidationProvider } from '@shared:providers/validation-provider/IValidation.provider';

// ---------------------------------------------------------------------------------------------- //

@injectable()
export class UpdateEmployeeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ValidationProvider')
    private validationProvider: IValidationProvider
  ) {}

  async execute(data: UpdateUserDto): Promise<void> {
    const { id, name, lastName } = data;

    // ------------------------------------------------------------------------------------------ //

    const isValid = await this.validationProvider.validateUserUpdateData(data);

    if (!isValid) {
      throw new InvalidDataError();
    }

    // ------------------------------------------------------------------------------------------ //

    await this.usersRepository.update({
      id,
      name: name.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase()
    });
  }
}
