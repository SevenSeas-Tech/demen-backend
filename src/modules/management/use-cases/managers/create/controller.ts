import { AppError } from '@shared/errors/app-error';
import { BadRequestError } from '@shared/errors/http/bad-request';

import { injectService } from './injection/inject-service';
import { isRequestValid } from './validations/request-validation';

import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';
import type { Request, Response } from 'express';

// * ---------------------------------------------------------------------- * //

async function managerCreationController(request: Request, response: Response):
 Promise<Response> {
  // *** --- request ---------------------------------------------------- *** //
  const data = request.body as ManagerCreationData;

  if (isRequestValid(data)) {
    const { statusCode, message } = new BadRequestError();

    return response.status(statusCode).json(message);
  }

  // *** --- service ---------------------------------------------------- *** //
  const service = injectService();

  const result = await service.execute(data);

  // *** --- response --------------------------------------------------- *** //
  if (result instanceof AppError) return response
    .status(result.statusCode)
    .json(result.message);

  return response.status(200).json(result);
}

// * ---------------------------------------------------------------------- * //

export { managerCreationController };
