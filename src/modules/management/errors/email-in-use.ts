import { AppError } from '@shared/errors/app-error';

// * ---------------------------------------------------------------------- * //

class EmailInUseError extends AppError {
  constructor() {
    super('Email already in use.', 400);
  }
}

// * ---------------------------------------------------------------------- * //

export { EmailInUseError };
