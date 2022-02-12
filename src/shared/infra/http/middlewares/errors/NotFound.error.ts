import { AppError } from '@shared/errors/App.error';

class NotFoundError extends AppError {
  constructor() {
    super('Not Found!', 404);
  }
}

export { NotFoundError };
