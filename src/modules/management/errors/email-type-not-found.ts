import { AppError } from '@shared/errors/app-error';

// * ---------------------------------------------------------------------- * //

class EmailTypeNotFoundError extends AppError {
  constructor() {
    super('Invalid email type.', 404);
  }
}

// * ---------------------------------------------------------------------- * //

export { EmailTypeNotFoundError };
