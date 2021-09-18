import { Router } from 'express';

import CreateUserController from '@accounts:use-cases/users/create-user/CreateUser.controller';
import ShowProfileController from '@accounts:use-cases/users/show-profile/ShowProfile.controller';
import AuthenticationMiddleware from '@shared/infra/http/middlewares/Authentication.middleware';

// ---------------------------------------------------------------------------------------------- //
const usersRouter = Router();

const createUserController = new CreateUserController();
const showProfileController = new ShowProfileController();

const authenticationMiddleware = new AuthenticationMiddleware();

// ---------------------------------------------------------------------------------------------- //

usersRouter.get('/profile', authenticationMiddleware.execute, showProfileController.execute);

usersRouter.post('/', createUserController.execute);

// ---------------------------------------------------------------------------------------------- //

export default usersRouter;
