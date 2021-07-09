import express, { Request, Response } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import routes from './routes';

class App {
  server = express();

  constructor() {
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use((err: Error, req: Request, res: Response) => {
      if (err instanceof AppError) {
        return res
          .status(err.statusCode)
          .json({ status: 'error', message: err.message });
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
