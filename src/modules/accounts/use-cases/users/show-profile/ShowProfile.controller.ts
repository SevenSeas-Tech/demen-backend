import { Request, Response } from 'express';

import ShowProfile from './ShowProfile.service';

// ---------------------------------------------------------------------------------------------- //

class ShowProfileController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const showProfile = new ShowProfile();

    const alteredUser = await showProfile.execute({ user });

    return response.status(201).json(alteredUser);
  }
}

export default ShowProfileController;
