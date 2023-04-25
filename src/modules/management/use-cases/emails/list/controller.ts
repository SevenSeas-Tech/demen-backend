import { EmailsRepositorySymbol } from '@management:injection/repositories/symbols';
import { BadRequestError } from '@shared/errors/bad-request';
import { DependencyInjection } from '@shared/injection';
import { isString } from '@shared:utils/type-validation/is-string';

import { ListEmailsService } from './service';

import type { Request, Response } from 'express';

// * ---------------------------------------------------------------------- * //

async function listEmailsController(request: Request, response: Response):
 Promise<Response> {
  const { userId, typeId } = request.query;

  // *** --- type check ------------------------------------------------- *** //

  if (userId && !isString(userId)) throw new BadRequestError();
  if (typeId && !isString(typeId)) throw new BadRequestError();

  // *** --- dependencies ----------------------------------------------- *** //

  const { container } = DependencyInjection;
  const emailsRepository = container[EmailsRepositorySymbol];
  const listEmailsService = new ListEmailsService(emailsRepository);

  // *** --- service ---------------------------------------------------- *** //

  const emails = await listEmailsService.execute({ userId, typeId });

  return response.status(201).json(emails);
}

// * ---------------------------------------------------------------------- * //

export { listEmailsController };
