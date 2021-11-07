import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateVideoService } from '@admin:use-cases/videos/CreateVideo.service';

// ---------------------------------------------------------------------------------------------- //

class CreateVideoController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { id, subjectId, institution, teacher } = request.body;

    const createVideoService = container.resolve(CreateVideoService);

    const video = await createVideoService.execute({ id, subjectId, userId, institution, teacher });

    return response.status(201).json(video);
  }
}

// ---------------------------------------------------------------------------------------------- //

export { CreateVideoController };
