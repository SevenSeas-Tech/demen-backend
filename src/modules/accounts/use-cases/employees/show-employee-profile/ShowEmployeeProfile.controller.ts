import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowEmployeeProfileService } from './ShowEmployeeProfile.service';

// ---------------------------------------------------------------------------------------------- //

export class ShowEmployeeProfileController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEmployeeProfile = container.resolve(ShowEmployeeProfileService);

    const employee = await showEmployeeProfile.execute({ id });

    return response.status(201).json(employee);
  }
}
