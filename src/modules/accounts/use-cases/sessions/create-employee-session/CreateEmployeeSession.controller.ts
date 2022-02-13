import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEmployeeSessionService } from './CreateEmployeeSession.service';

export class CreateEmployeeSessionController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createEmployeeSession = container.resolve(CreateEmployeeSessionService);

    const token = await createEmployeeSession.execute({ email, password });

    return response.status(201).json(token);
  }
}
