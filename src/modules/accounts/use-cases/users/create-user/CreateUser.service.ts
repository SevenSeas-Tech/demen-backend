import { inject, injectable } from 'tsyringe';

import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import InvalidDataError from '@accounts:errors/InvalidData.error';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import UserMap from '@accounts:mapper/User.map';
import IHashProvider from '@shared/containers/providers/hash-provider/IHash.provider';
import IValidationProvider from '@shared/containers/providers/validation-provider/IValidation.provider';

import EmailInUseError from './errors/EmailInUse.error';
import UsernameTakenError from './errors/UsernameTaken.error';

// ---------------------------------------------------------------------------------------------- //
@injectable()
class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ValidationProvider')
    private validationProvider: IValidationProvider
  ) {}

  async execute(data: CreateUserDto): Promise<UserResponseDto> {
    const isValid = await this.validationProvider.validateUserCreationData(data);

    if (!isValid) {
      throw new InvalidDataError();
    }

    const { username, email, name, lastName, password } = data;

    // ------------------------------------------------------------------------------------------ //

    const findByUsername = await this.usersRepository.findByUsername(username);

    if (findByUsername) {
      throw new UsernameTakenError();
    }

    const findByEmail = await this.usersRepository.findByEmail(email);

    if (findByEmail) {
      throw new EmailInUseError();
    }

    const passwordHash = await this.hashProvider.hash(password);

    const user = await this.usersRepository.create({
      username: username.trim(),
      email,
      name: name.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
      password: passwordHash
    });

    return UserMap.toDto(user);
  }
}

export default CreateUser;
