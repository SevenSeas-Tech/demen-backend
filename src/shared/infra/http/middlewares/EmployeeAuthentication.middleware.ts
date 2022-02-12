import { Request, Response, NextFunction } from 'express';

import { ITokenProvider } from '@accounts:containers/providers/token-provider/IToken.provider';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { ProviderFactory } from '@shared/containers/factories/Provider.factory';
import { RepositoryFactory } from '@shared/containers/factories/Repository.factory';
import { UnauthorizedError } from '@shared/infra/http/middlewares/errors/Unauthorized.error';

// ---------------------------------------------------------------------------------------------- //

class EmployeeAuthenticationMiddleware {
  async execute(request: Request, _: Response, next: NextFunction): Promise<void> {
    const providerInjection = new ProviderFactory();
    const repositoryInjection = new RepositoryFactory();

    const tokenProvider: ITokenProvider = providerInjection.TokenProvider;
    const usersRepository: IEmployeesRepository = repositoryInjection.EmployeesRepository;

    const { authorization } = request.headers;

    // ------------------------------------------------------------------------------------------ //

    if (!authorization) {
      throw new UnauthorizedError();
    }

    const [, token] = authorization.split(' ');

    try {
      const { id, email } = tokenProvider.verify(token, 'jwt');

      const employee = await usersRepository.findById(id);

      if (!employee) {
        throw new UnauthorizedError();
      }

      const { username, name, lastName, phone, createdAt, updatedAt } = employee;

      request.employee = {
        id,
        username,
        email,
        name,
        lastName,
        phone,
        createdAt,
        updatedAt
      };
      next();
    } catch {
      throw new UnauthorizedError();
    }
  }
}

export { EmployeeAuthenticationMiddleware };
