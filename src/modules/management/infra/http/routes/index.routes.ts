import { Router } from 'express';

import { employeesRouter } from './employees.routes';
import { sessionsRouter } from './sessions.routes';
import { usersRouter } from './users.routes';

// ---------------------------------------------------------------------------------------------- //
const accountsRouter = Router();

accountsRouter.use('/users', usersRouter);
accountsRouter.use('/sessions', sessionsRouter);
accountsRouter.use('/employees', employeesRouter);

export { accountsRouter };
