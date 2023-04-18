import { EmailsRepositorySymbol } from '@management:injection/repositories/symbols';
import { AppError } from '@shared/errors/app-error';
import { DependencyInjection } from '@shared/injection';

import { ListManagerEmailsService } from './service';

import type { Request, Response } from 'express';

// * ---------------------------------------------------------------------- * //

class ListManagerEmailsController {
  static async execute(request: Request, response: Response): Promise<Response> {
    const { userId } = request.query;

    if (typeof userId !== 'string') throw new AppError('bad request', 400);

    // *** --- service -------------------------------------------------- *** //
    const { container } = DependencyInjection;

    const emailsRepository = container[EmailsRepositorySymbol];

    const listEmailsService = new ListManagerEmailsService(emailsRepository);

    const emails = await listEmailsService.execute(userId);

    return response.status(201).json(emails);
  }
}

// * ---------------------------------------------------------------------- * //

export { ListManagerEmailsController };
