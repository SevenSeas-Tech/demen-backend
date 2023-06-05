import { AppError } from '@shared/errors/app-error';

// * ---------------------------------------------------------------------- * //
class InvalidCredentialsError extends AppError {
  constructor() {
    super('Incorrect password or email');
  }
}

// * ---------------------------------------------------------------------- * //

export { InvalidCredentialsError };
