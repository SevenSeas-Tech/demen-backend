import { Router } from 'express';

import { CreateUserController } from '@accounts:use-cases/users/create-user/CreateUser.controller';
import { ListUsersController } from '@accounts:use-cases/users/list-users/ListUsers.controller';
import { ShowUserProfileController } from '@accounts:use-cases/users/show-user-profile/ShowUserProfile.controller';
import { EmployeeAuthenticationMiddleware } from '@shared/infra/http/middlewares/EmployeeAuthentication.middleware';
// import { UserAuthenticationMiddleware } from '@shared/infra/http/middlewares/UserAuthentication.middleware';

// ---------------------------------------------------------------------------------------------- //

const usersRouter = Router();

// *** ---- Middlewares --------------------------------------------------------------------- *** //
// const userAuthenticationMiddleware = new UserAuthenticationMiddleware();
const employeeAuthenticationMiddleware = new EmployeeAuthenticationMiddleware();

// *** ---- Controllers --------------------------------------------------------------------- *** //
const createUserController = new CreateUserController();
const showProfileController = new ShowUserProfileController();
const listUsersController = new ListUsersController();

// *** ---- Client Routes ------------------------------------------------------------------- *** //
usersRouter.post('/', createUserController.execute);

// usersRouter.get('/profile', userAuthenticationMiddleware.execute, showProfileController.execute);

// *** ---- Admin routes -------------------------------------------------------------------- *** //
usersRouter.use(employeeAuthenticationMiddleware.execute);

usersRouter.get('/:id', showProfileController.execute);

usersRouter.get('/', listUsersController.execute);

// ---------------------------------------------------------------------------------------------- //

export { usersRouter };
