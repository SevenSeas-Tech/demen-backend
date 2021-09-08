import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUser from './CreateUser.service';

class CreateUserController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { username, name, lastName, email, password } = request.body;
    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute({ username, name, lastName, email, password });

    return response.status(201).json(user);
  }
}

export default CreateUserController;
