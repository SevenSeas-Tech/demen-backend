import { inject, injectable } from 'tsyringe';

import ITokenProvider from '@accounts:containers/providers/token-provider/IToken.provider';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import UserMap from '@accounts:mapper/User.map';
import { LoginCredentials, SessionResponse } from '@accounts:types/sessions/Sessions';
import IHashProvider from '@shared/containers/providers/hash-provider/IHash.provider';
import AppError from '@shared/errors/App.error';

@injectable()
class CreateSession {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenProvider')
    private TokenProvider: ITokenProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: LoginCredentials): Promise<SessionResponse> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('');
    }

    const passwordMatch = await this.hashProvider.match(password, user.password);

    if (!passwordMatch) {
      throw new AppError('');
    }

    const { id, admin } = user;
    const token = this.TokenProvider.sign({ id, admin }, 'jwt');

    const response = {
      user: UserMap.toDto(user),
      token,
    };

    return response;
  }
}

export default CreateSession;
