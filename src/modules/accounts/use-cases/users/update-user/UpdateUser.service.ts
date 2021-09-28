import { inject, injectable } from 'tsyringe';

import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import InvalidDataError from '@accounts:errors/InvalidData.error';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import UserMap from '@accounts:mapper/User.map';
import IValidationProvider from '@shared:providers/validation-provider/IValidation.provider';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class UpdateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ValidationProvider')
    private validationProvider: IValidationProvider
  ) {}

  async execute(data: UpdateUserDto): Promise<UserResponseDto> {
    const { id, name, lastName } = data;

    // ------------------------------------------------------------------------------------------ //

    const isValid = await this.validationProvider.validateUserUpdateData(data);

    if (!isValid) {
      throw new InvalidDataError();
    }

    // ------------------------------------------------------------------------------------------ //

    const user = await this.usersRepository.update({
      id,
      name: name.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase()
    });

    return UserMap.toDto(user);
  }
}

// ---------------------------------------------------------------------------------------------- //

export default UpdateUser;
