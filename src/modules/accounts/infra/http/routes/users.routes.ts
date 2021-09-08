import { Router } from 'express';

import CreateUserController from '@accounts:use-cases/users/create-user/CreateUser.controller';

const createUserController = new CreateUserController();

const usersRouter = Router();

usersRouter.post('/', createUserController.execute);

export default usersRouter;
