import { Router } from 'express';

import { videosRouter } from '@lessons:routes/videos.routes';

// ---------------------------------------------------------------------------------------------- //

const lessonsRouter = Router();

lessonsRouter.use('/videos', videosRouter);

// ---------------------------------------------------------------------------------------------- //

export { lessonsRouter };
