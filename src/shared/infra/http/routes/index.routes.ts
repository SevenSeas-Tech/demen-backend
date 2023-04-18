import { lessonsRouter } from '@content:infra/http/routes/index.routes';
import { managementRouter } from '@management:infra/http/routes/index.routes';
import { Router } from 'express';

// * ---------------------------------------------------------------------- * //

const routes = Router();

// -------------------------------------------------------------------------- //

routes.use('/content', lessonsRouter);
routes.use('/education');
routes.use('/management', managementRouter);
routes.use('/students');

// * ---------------------------------------------------------------------- * //

export { routes };

// todo: implement all routes. only management is for now.
