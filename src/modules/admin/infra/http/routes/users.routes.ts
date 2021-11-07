import { Router } from 'express';

import ListUsersController from '@admin:use-cases/users/list-users/ListUsers.controller';
import AuthenticationMiddleware from '@shared/infra/http/middlewares/Authentication.middleware';
import VerifyAdminStatusMiddleware from '@shared/infra/http/middlewares/VerifyAdminStatus.middleware';

// ---------------------------------------------------------------------------------------------- //

const authenticationMiddleware = new AuthenticationMiddleware();
const verifyAdminStatusMiddleware = new VerifyAdminStatusMiddleware();

const usersRouter = Router();

const listUsersController = new ListUsersController();

// ---------------------------------------------------------------------------------------------- //

usersRouter.use(authenticationMiddleware.execute);
usersRouter.use(verifyAdminStatusMiddleware.execute);

usersRouter.get('/', listUsersController.execute);

// ---------------------------------------------------------------------------------------------- //

export { usersRouter };
