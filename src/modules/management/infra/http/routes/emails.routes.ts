import { ListManagerEmailsController } from '@management:use-cases/emails/list/controller';
import { Router } from 'express';

import type { RequestHandler } from 'express';

// * ---------------------------------------------------------------------- * //

const emailRouter = Router();

// *** --- middlewares -------------------------------------------------- *** //

// const managerAuthentication = new EmployeeAuthenticationMiddleware();

// *** --- controllers -------------------------------------------------- *** //

const listManagerEmails = ListManagerEmailsController.execute as RequestHandler;

// *** --- routes ------------------------------------------------------- *** //

// ? --- authentication --------------------------------------------------- ? //
// emailRouter.use(employeeAuthenticationMiddleware.execute);

// ? --- list users e-mails ----------------------------------------------- ? //
emailRouter.get('/', listManagerEmails);
emailRouter.get('/:id');
emailRouter.post('/');
emailRouter.patch('/:id');
emailRouter.delete('/:id');

// * ---------------------------------------------------------------------- * //

export { emailRouter };

/*
  todo: authentication middleware;
  todo: remaining routes;
*/
