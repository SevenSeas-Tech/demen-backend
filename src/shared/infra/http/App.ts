import 'reflect-metadata';
import 'dotenv/config';

import '@shared:containers/index';

import 'express-async-errors';

// eslint-disable-next-line import/order
import express from 'express';

import { serve, setup } from 'swagger-ui-express';
import Yaml from 'yamljs';

// ! --- import { load } from 'yamljs' - Does not work -------------------- ! //

import { routes } from './routes/index.routes';

import type { JsonObject } from 'swagger-ui-express';
import type { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/App.error';
import { database } from '@shared/infra/database';

// * ---------------------------------------------------------------------- * //

class App {
  server = express();
  // eslint-disable-next-line import/no-named-as-default-member
  swaggerDocument = Yaml.load('./swagger.yml') as JsonObject;

  // ------------------------------------------------------------------------ //

  constructor() {
    void database.createConnection();
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
    this.server.use('/api-docs', serve, setup(this.swaggerDocument));
  }

  // ------------------------------------------------------------------------ //

  exceptionHandler(): void {
    this.server
      .use((err: Error, req: Request, res: Response, _: NextFunction) => {
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
