import { Request, Response, NextFunction } from 'express';

import { ITokenProvider } from '@accounts:containers/providers/token-provider/IToken.provider';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { ProviderFactory } from '@shared/containers/factories/Provider.factory';
import { RepositoryFactory } from '@shared/containers/factories/Repository.factory';
import { UnauthorizedError } from '@shared/infra/http/middlewares/errors/Unauthorized.error';

// ---------------------------------------------------------------------------------------------- //

class UserAuthenticationMiddleware {
  async execute(request: Request, _: Response, next: NextFunction): Promise<void> {
    const providerInjection = new ProviderFactory();
    const repositoryInjection = new RepositoryFactory();

    const tokenProvider: ITokenProvider = providerInjection.TokenProvider;
    const usersRepository: IUsersRepository = repositoryInjection.UsersRepository;

    const { authorization } = request.headers;

    // ------------------------------------------------------------------------------------------ //

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

      const { googleId, avatar, name, lastName, createdAt, updatedAt } = user;

      request.user = {
        id,
        googleId,
        avatar,
        email,
        name,
        lastName,
        createdAt,
        updatedAt
      };
      next();
    } catch {
      throw new UnauthorizedError();
    }
  }
}

export { UserAuthenticationMiddleware };
