import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSession from './CreateSession.service';

class CreateSessionController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSession);

    const token = await createSession.execute({ email, password });

    return response.status(201).json(token);
  }
}

export default CreateSessionController;
