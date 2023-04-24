import { EmailsRepositorySymbol } from '@management:injection/repositories/symbols';
import { BadRequestError } from '@shared/errors/bad-request';
import { DependencyInjection } from '@shared/injection';
import { isString } from '@shared:utils/type-validation/is-string';

import { ListManagerEmailsService } from './service';

import type { Request, Response } from 'express';

// * ---------------------------------------------------------------------- * //

async function listEmailsController(request: Request, response: Response): Promise<Response> {
  const { userId } = request.query;

  if (!isString(userId)) throw new BadRequestError();

  // *** --- service ---------------------------------------------------- *** //

  const { container } = DependencyInjection;

  const emailsRepository = container[EmailsRepositorySymbol];

  const listEmailsService = new ListManagerEmailsService(emailsRepository);

  const emails = await listEmailsService.execute(userId);

  return response.status(201).json(emails);
}

// * ---------------------------------------------------------------------- * //

export { listEmailsController };
