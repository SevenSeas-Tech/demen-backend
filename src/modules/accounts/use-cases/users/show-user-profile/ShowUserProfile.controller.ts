import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserProfileService } from './ShowUserProfile.service';

// ---------------------------------------------------------------------------------------------- //

export class ShowUserProfileController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProfile = container.resolve(ShowUserProfileService);

    const alteredUser = await showProfile.execute({ id });

    return response.status(201).json(alteredUser);
  }
}
