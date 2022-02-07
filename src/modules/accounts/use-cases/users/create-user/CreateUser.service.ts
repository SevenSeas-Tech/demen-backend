import { inject, injectable } from 'tsyringe';

import { IOAuthProvider } from '@accounts:containers/providers/OAuthProvider/IOAuth.provider';
import { OAuthTokenDto } from '@accounts:dtos/oauth/OAuthToken.dto';
import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { UserMap } from '@accounts:mapper/User.map';

// ---------------------------------------------------------------------------------------------- //
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GOAuthProvider')
    private oauthProvider: IOAuthProvider
  ) {}

  async execute(data: OAuthTokenDto): Promise<UserResponseDto> {
    // const isValid = await this.validationProvider.validateUserCreationData(data);

    // if (!isValid) {
    //   throw new InvalidDataError();
    // }

    const { idToken } = data;

    const {
      userId: googleId,
      avatar,
      email,
      name,
      lastName
    } = await this.oauthProvider.verify(idToken);

    // ------------------------------------------------------------------------------------------ //

    const findByEmail = await this.usersRepository.findByEmail(email);

    if (findByEmail) {
      throw new EmailInUseError();
    }

    const user = await this.usersRepository.create({
      email,
      name: name.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
      avatar,
      googleId
    });

    return UserMap.toDto(user);
  }
}

export { CreateUserService };
