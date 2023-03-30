import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersService } from './ListUsers.service';

export class ListUsersController {
  async execute(_: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);
    const users = await listUsers.execute();

    return response.status(201).json(users);
  }
}
