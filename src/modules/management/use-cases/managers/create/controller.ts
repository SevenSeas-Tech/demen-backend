import {
  EmailTypesRepositorySymbol,
  EmailsRepositorySymbol,
  ManagersRepositorySymbol
} from '@management:injection/repositories/symbols';
import { BadRequestError } from '@shared/errors/bad-request';
import { DependencyInjection } from '@shared/injection';

import { ManagerCreationService } from './manager-creation-service';

import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { Request, Response } from 'express';

// * ---------------------------------------------------------------------- * //

async function managerCreationController(request: Request, response: Response):
 Promise<Response> {
  const { container } = DependencyInjection;

  const {
    name,
    surname,
    emailAddress,
    emailType,
    password,
    passwordConfirmation
  } = request.body as ManagerCreationData;

  if (
    !name ||
    !surname ||
    !emailAddress ||
    !emailType ||
    !emailType ||
    !password ||
    !passwordConfirmation
  ) throw new BadRequestError();

  const service = new ManagerCreationService(
    container[ManagersRepositorySymbol],
    container[EmailsRepositorySymbol],
    container[EmailTypesRepositorySymbol]
  );

  const result = await service.execute({
    name,
    emailAddress,
    emailType,
    password,
    passwordConfirmation,
    surname
  });

  return response.status(200).json(result);
}

// * ---------------------------------------------------------------------- * //

export { managerCreationController };
