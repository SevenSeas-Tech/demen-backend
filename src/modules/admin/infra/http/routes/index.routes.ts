import { Router } from 'express';

import usersRouter from '@admin:routes/users.routes';

const adminRouter = Router();

adminRouter.use('/users', usersRouter);

export default adminRouter;
