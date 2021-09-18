import { Request, Response, NextFunction } from 'express';

import JwtProvider from '@accounts:containers/providers/token-provider/implementations/Jwt.provider';
import ITokenProvider from '@accounts:containers/providers/token-provider/IToken.provider';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import UsersRepository from '@accounts:repos/Users.repository';
import UnauthorizedError from '@shared/infra/http/middlewares/errors/Unauthorized.error';

class AuthenticationMiddleware {
  /**
   * TODO: Implement dependency injection.
   * * tsyringe couldn't inject user's repository.
   * * It did not find the database default connection.
   */

  async execute(request: Request, _: Response, next: NextFunction): Promise<void> {
    // ! -- On (provider | repository) change, change this lines too -------------------------- ! //
    const tokenProvider: ITokenProvider = new JwtProvider();
    const usersRepository: IUsersRepository = new UsersRepository();

    // ------------------------------------------------------------------------------------------ //

    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedError();
    }

    const [, token] = authorization.split(' ');

    try {
      const { id, email } = tokenProvider.verify(token, 'jwt');

      const user = await usersRepository.findById(id);

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
