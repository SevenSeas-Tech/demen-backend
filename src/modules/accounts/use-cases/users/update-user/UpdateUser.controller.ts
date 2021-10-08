import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUser from './UpdateUser.service';

// ---------------------------------------------------------------------------------------------- //

class UpdateUserController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, lastName } = request.body;
    const { id } = request.user;

    const updateUser = container.resolve(UpdateUser);

    await updateUser.execute({ id, name, lastName });

    return response.status(204).send();
  }
}

// ---------------------------------------------------------------------------------------------- //

export default UpdateUserController;
