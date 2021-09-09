import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const accountsRouter = Router();

accountsRouter.use('/users', usersRouter);
accountsRouter.use('/sessions', sessionsRouter);

export default accountsRouter;
