import 'reflect-metadata';
import 'dotenv/config';

import '@shared:containers/index';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import AppError from '@shared/errors/App.error';
import createConnection from '@shared/infra/typeorm';

import routes from './routes/index.routes';

// ---------------------------------------------------------------------------------------------- //

class App {
  server = express();
  swaggerDocument = YAML.load('./swagger.yml');

  constructor() {
    createConnection();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
  }

  exceptionHandler() {
    this.server.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ status: 'error', message: err.message });
      }
      if (process.env.NODE_ENV !== 'production') {
        return res.status(500).json({
          status: 'error',
          message: err.message,
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'internal server error',
      });
    });
  }
}

export default new App().server;
