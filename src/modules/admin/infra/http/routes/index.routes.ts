import { Router } from 'express';

import { usersRouter } from '@admin:routes/users.routes';
import { videosRouter } from '@admin:routes/videos.routes';

// ---------------------------------------------------------------------------------------------- //

const adminRouter = Router();

adminRouter.use('/users', usersRouter);
adminRouter.use('/videos', videosRouter);

// ---------------------------------------------------------------------------------------------- //

export { adminRouter };
