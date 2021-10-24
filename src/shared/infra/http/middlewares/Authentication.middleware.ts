import { Request, Response, NextFunction } from 'express';

import ITokenProvider from '@accounts:containers/providers/token-provider/IToken.provider';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import ProviderContainer from '@shared/containers/middlewares/Provider.container';
import RepositoryContainer from '@shared/containers/middlewares/Repository.container';
import UnauthorizedError from '@shared/infra/http/middlewares/errors/Unauthorized.error';

class AuthenticationMiddleware {
  async execute(request: Request, _: Response, next: NextFunction): Promise<void> {
    const providerInjection = new ProviderContainer();
    const repositoryInjection = new RepositoryContainer();

    const tokenProvider: ITokenProvider = providerInjection.TokenProvider;
    const usersRepository: IUsersRepository = repositoryInjection.UsersRepository;

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
        verified: user.verified,
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
