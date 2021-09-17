import AppError from '@shared/errors/App.error';

class UnauthorizedError extends AppError {
  constructor() {
    super('Unauthorized!', 401);
  }
}

export default UnauthorizedError;
