import 'reflect-metadata';
import 'dotenv/config';
import '@shared:containers/index';
import 'express-async-errors';

// eslint-disable-next-line import/order
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import Yaml from 'yamljs';

import { AppError } from '@shared/errors/app-error';
import { database } from '@shared/infra/database';

import { routes } from './routes/index.routes';

import type { Request, Response, NextFunction } from 'express';
import type { JsonObject } from 'swagger-ui-express';

// * ---------------------------------------------------------------------- * //

class App {
  // eslint-disable-next-line import/no-named-as-default-member
  private readonly swaggerDocument = Yaml.load('./swagger.yml') as JsonObject;
  readonly server = express();

  // ------------------------------------------------------------------------ //

  constructor() {
    void database.connect();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  // ------------------------------------------------------------------------ //

  middlewares(): void {
    this.server.use(express.json());
  }

  // ------------------------------------------------------------------------ //

  routes(): void {
    this.server.use(routes);
    this.server.use('/docs', serve, setup(this.swaggerDocument));
  }

  // ------------------------------------------------------------------------ //

  exceptionHandler(): void {
    this.server
      .use((err: Error, _req: Request, res: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return res
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
        }

        if (process.env.NODE_ENV !== 'production') {
          return res
            .status(500)
            .json({
              status: 'error',
              message: err.message
            });
        }

        return res
          .status(500)
          .json({
            status: 'error',
            message: 'internal server error'
          });
      });
  }
}

// * ---------------------------------------------------------------------- * //

export { App };

/*
  * --- annotations --- *
  ! - import { load } from 'yamljs' doesn't work,
  ! - so default import must be used
*/
