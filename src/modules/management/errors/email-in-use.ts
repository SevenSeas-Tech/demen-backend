import { AppError } from '@shared/errors/app-error';

// * ---------------------------------------------------------------------- * //
class EmailInUseError extends AppError {
  constructor() {
    super('Email is already in use!', 400);
  }
}

// * ---------------------------------------------------------------------- * //

export { EmailInUseError };
