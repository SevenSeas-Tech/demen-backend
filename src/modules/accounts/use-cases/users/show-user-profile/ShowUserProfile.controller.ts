import { Request, Response } from 'express';

import { ShowUserProfileService } from './ShowUserProfile.service';

// ---------------------------------------------------------------------------------------------- //

class ShowUserProfileController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const showProfile = new ShowUserProfileService();

    const alteredUser = await showProfile.execute({ user });

    return response.status(201).json(alteredUser);
  }
}

export { ShowUserProfileController };
