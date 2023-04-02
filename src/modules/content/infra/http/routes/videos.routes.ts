import Router from 'express';

import { CreateVideoController } from '@lessons:use-cases/videos/create-video/CreateVideo.controller';
import { EmployeeAuthenticationMiddleware } from '@shared/infra/http/middlewares/EmployeeAuthentication.middleware';

// ---------------------------------------------------------------------------------------------- //

const videosRouter = Router();

const employeeAuthenticationMiddleware = new EmployeeAuthenticationMiddleware();

const createVideoController = new CreateVideoController();

// ---------------------------------------------------------------------------------------------- //

videosRouter.use(employeeAuthenticationMiddleware.execute);

videosRouter.post('/', createVideoController.execute);

// ---------------------------------------------------------------------------------------------- //

export { videosRouter };
