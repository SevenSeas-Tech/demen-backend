import { Request, Response } from 'express';

import { ShowEmployeeProfileService } from './ShowEmployeeProfile.service';

// ---------------------------------------------------------------------------------------------- //

export class ShowEmployeeProfileController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { employee } = request;

    const showEmployeeProfile = new ShowEmployeeProfileService();

    const alteredEmployee = await showEmployeeProfile.execute({ employee });

    return response.status(201).json(alteredEmployee);
  }
}
