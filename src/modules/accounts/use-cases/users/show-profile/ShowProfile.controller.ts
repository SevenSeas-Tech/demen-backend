import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfile from './ShowProfile.service';

class ShowProfileController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfile);

    const user = await showProfile.execute(id);

    return response.status(201).json(user);
  }
}

export default ShowProfileController;
