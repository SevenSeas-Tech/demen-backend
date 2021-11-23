import { Router } from 'express';

import CreateUserController from '@accounts:use-cases/users/create-user/CreateUser.controller';
import ShowProfileController from '@accounts:use-cases/users/show-profile/ShowProfile.controller';
import UpdateUserController from '@accounts:use-cases/users/update-user/UpdateUser.controller';
import { AuthenticationMiddleware } from '@shared:middlewares/Authentication.middleware';

// ---------------------------------------------------------------------------------------------- //

const usersRouter = Router();

const authenticationMiddleware = new AuthenticationMiddleware();

const createUserController = new CreateUserController();
const showProfileController = new ShowProfileController();
const updateUserController = new UpdateUserController();

// ---------------------------------------------------------------------------------------------- //

usersRouter.get('/profile', authenticationMiddleware.execute, showProfileController.execute);

usersRouter.patch('/profile', authenticationMiddleware.execute, updateUserController.execute);

usersRouter.post('/', createUserController.execute);

// ---------------------------------------------------------------------------------------------- //

export default usersRouter;
