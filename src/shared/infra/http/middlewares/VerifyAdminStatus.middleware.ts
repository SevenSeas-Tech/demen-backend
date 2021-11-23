import { Request, Response, NextFunction } from 'express';

import NotFoundError from './errors/NotFound.error';

class VerifyAdminStatusMiddleware {
  async execute(request: Request, _: Response, next: NextFunction): Promise<void> {
    const { admin } = request.user;

    if (!admin) {
      throw new NotFoundError();
    }

    next();
  }
}

export { VerifyAdminStatusMiddleware };
