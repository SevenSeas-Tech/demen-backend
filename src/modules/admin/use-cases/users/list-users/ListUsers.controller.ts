import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsers from '@admin:use-cases/users/list-users/ListUsers.service';

class ListUsersController {
  async execute(_: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsers);
    const users = await listUsers.execute();

    return response.status(201).json(users);
  }
}

export default ListUsersController;
