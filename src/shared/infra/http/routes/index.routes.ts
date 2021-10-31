import { Router } from 'express';

import accountsRouter from '@accounts:routes/index.routes';
import adminRouter from '@admin:routes/index.routes';

// ---------------------------------------------------------------------------------------------- //

const routes = Router();

// ---------------------------------------------------------------------------------------------- //

routes.use('/accounts', accountsRouter);
routes.use('/admin', adminRouter);

// ---------------------------------------------------------------------------------------------- //

export default routes;
