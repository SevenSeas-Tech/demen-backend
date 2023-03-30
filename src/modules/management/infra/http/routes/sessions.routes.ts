import { Router } from 'express';

import { CreateEmployeeSessionController } from '@accounts:use-cases/sessions/create-employee-session/CreateEmployeeSession.controller';

const sessionsRouter = Router();

// *** -------------------- Controllers ----------------------------------------------------- *** //

const createEmployeeSessionController = new CreateEmployeeSessionController();

// *** -------------------- Routes ---------------------------------------------------------- *** //

// sessionsRouter.post('/user', createUserSessionController.execute);
sessionsRouter.post('/employees', createEmployeeSessionController.execute);

// ---------------------------------------------------------------------------------------------- //

export { sessionsRouter };
