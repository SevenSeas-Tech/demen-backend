import { managerCreationController } from '@management:use-cases/managers/create/controller';
import { Router } from 'express';

import type { RequestHandler } from 'express';

// * ---------------------------------------------------------------------- * //

const usersRouter = Router();

// *** --- middlewares -------------------------------------------------- *** //
// const userAuthenticationMiddleware = new UserAuthenticationMiddleware();
// const employeeAuthenticationMiddleware = new EmployeeAuthenticationMiddleware();

// *** --- controllers -------------------------------------------------- *** //
usersRouter.post('/', managerCreationController as RequestHandler);

// *** ---- routes ------------------------------------------------------ *** //

// * ---------------------------------------------------------------------- * //

export { usersRouter };
