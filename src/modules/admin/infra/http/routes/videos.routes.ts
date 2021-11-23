import Router from 'express';

import { CreateVideoController } from '@admin:use-cases/videos/CreateVideo.controller';
import { AuthenticationMiddleware } from '@shared/infra/http/middlewares/Authentication.middleware';
import { VerifyAdminStatusMiddleware } from '@shared/infra/http/middlewares/VerifyAdminStatus.middleware';

// ---------------------------------------------------------------------------------------------- //

const videosRouter = Router();

const authenticationMiddleware = new AuthenticationMiddleware();
const verifyAdminStatusMiddleware = new VerifyAdminStatusMiddleware();

const createVideoController = new CreateVideoController();

// ---------------------------------------------------------------------------------------------- //

videosRouter.use(authenticationMiddleware.execute);
videosRouter.use(verifyAdminStatusMiddleware.execute);

videosRouter.post('/', createVideoController.execute);

// ---------------------------------------------------------------------------------------------- //

export { videosRouter };
