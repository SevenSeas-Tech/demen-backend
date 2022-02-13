import { Router } from 'express';

import { CreateEmployeeSessionController } from '@accounts:use-cases/sessions/create-employee-session/CreateEmployeeSession.controller';
import { CreateUserSessionController } from '@accounts:use-cases/sessions/create-user-session/CreateUserSession.controller';

const sessionsRouter = Router();

// *** -------------------- Controllers ----------------------------------------------------- *** //

const createUserSessionController = new CreateUserSessionController();
const createEmployeeSessionController = new CreateEmployeeSessionController();

// *** -------------------- Routes ---------------------------------------------------------- *** //

sessionsRouter.post('/user', createUserSessionController.execute);
sessionsRouter.post('/employee', createEmployeeSessionController.execute);

// ---------------------------------------------------------------------------------------------- //

export { sessionsRouter };
