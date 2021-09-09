import { Router } from 'express';

import CreateSessionController from '@accounts:use-cases/sessions/create-session/CreateSession.controller';

const sessionsRouter = Router();

// *** -------------------- Controllers ----------------------------------------------------- *** //

const createSessionController = new CreateSessionController();

// *** -------------------- Routes ---------------------------------------------------------- *** //

sessionsRouter.post('/', createSessionController.execute);

// ---------------------------------------------------------------------------------------------- //

export default sessionsRouter;
