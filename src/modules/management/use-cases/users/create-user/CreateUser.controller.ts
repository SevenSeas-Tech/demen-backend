import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from './CreateUser.service';

class CreateUserController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { idToken } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ idToken });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
