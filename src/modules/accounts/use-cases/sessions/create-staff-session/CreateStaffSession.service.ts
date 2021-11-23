import { inject, injectable } from 'tsyringe';

import ITokenProvider from '@accounts:containers/providers/token-provider/IToken.provider';
import UserMap from '@accounts:mapper/User.map';
import { LoginCredentials, SessionResponse } from '@accounts:types/sessions/Sessions';
import { InvalidCredentialsError } from '@accounts:use-cases/sessions/errors/InvalidCredentials.error';
import { IStaffMembersRepository } from '@admin:irepos/IStaffMembers.repository';
import IHashProvider from '@shared/containers/providers/hash-provider/IHash.provider';
import IValidationProvider from '@shared/containers/providers/validation-provider/IValidation.provider';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class CreateStaffSessionService {
  constructor(
    @inject('UsersRepository')
    private staffMembersRepository: IStaffMembersRepository,

    @inject('TokenProvider')
    private TokenProvider: ITokenProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ValidationProvider')
    private validationProvider: IValidationProvider
  ) {}

  async execute(data: LoginCredentials): Promise<SessionResponse> {
    const isValid = await this.validationProvider.validateLogin(data);

    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const { email, password } = data;

    const user = await this.staffMembersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await this.hashProvider.match(password, user.password);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const { id } = user;
    const token = this.TokenProvider.sign({ id, email }, 'jwt');

    const response = {
      user: UserMap.toDto(user),
      token
    };

    return response;
  }
}

export { CreateStaffSessionService };
