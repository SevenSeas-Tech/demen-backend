import { Router } from 'express';

import { emailRouter } from './emails.routes';
import { sessionsRouter } from './sessions.routes';
import { usersRouter } from './users.routes';

// * ---------------------------------------------------------------------- * //

const managementRouter = Router();

managementRouter.use('/users', usersRouter);
managementRouter.use('/sessions', sessionsRouter);
managementRouter.use('/emails', emailRouter);
managementRouter.use('/email-types');

// * ---------------------------------------------------------------------- * //

export { managementRouter };
