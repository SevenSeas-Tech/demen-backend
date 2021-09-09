import { Router } from 'express';

import accountsRouter from '@accounts:routes/index.routes';

const routes = Router();

routes.use('/accounts', accountsRouter);

export default routes;
