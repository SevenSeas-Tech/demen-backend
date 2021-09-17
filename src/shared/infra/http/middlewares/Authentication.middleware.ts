import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';

import ITokenProvider from '@accounts:containers/providers/token-provider/IToken.provider';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import UnauthorizedError from '@shared/infra/http/middlewares/errors/Unauthorized.error';

@injectable()
class AuthenticationMiddleware {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute(request: Request, r_: Response, next: NextFunction): Promise<void> {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedError();
    }

    const [, token] = authorization.split(' ');

    try {
      const { id, email } = this.tokenProvider.verify(token, 'jwt');

      const user = await this.usersRepository.findById(id);

      if (!user) {
        throw new UnauthorizedError();
      }

      request.user = {
        id,
        username: user.username,
        email,
        name: user.name,
        lastName: user.last_name,
        admin: user.admin,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      };
      next();
    } catch {
      throw new UnauthorizedError();
    }
  }
}

export default AuthenticationMiddleware;
