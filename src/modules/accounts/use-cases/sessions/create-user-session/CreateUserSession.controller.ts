import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserSessionService } from './CreateUserSession.service';

// Todo: this controller must be reimplemented
export class CreateUserSessionController {
  async execute(request: Request, response: Response): Promise<Response> {
    const createSession = container.resolve(CreateUserSessionService);

    const token = await createSession.execute();

    return response.status(201).json(token);
  }
}
