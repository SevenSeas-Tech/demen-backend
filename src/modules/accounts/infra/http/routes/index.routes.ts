import { Router } from 'express';

import usersRouter from './users.routes';

const accountsRouter = Router();

accountsRouter.use('/users', usersRouter);

export default accountsRouter;
