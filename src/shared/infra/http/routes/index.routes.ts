import { Router } from 'express';

import { accountsRouter } from '@accounts:routes/index.routes';
import { lessonsRouter } from '@lessons:routes/index.routes';

// ---------------------------------------------------------------------------------------------- //

const routes = Router();

// ---------------------------------------------------------------------------------------------- //

routes.use('/accounts', accountsRouter);
routes.use('/lessons', lessonsRouter);

// ---------------------------------------------------------------------------------------------- //

export { routes };
