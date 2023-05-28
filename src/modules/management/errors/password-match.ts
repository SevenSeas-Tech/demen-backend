import { AppError } from '@shared/errors/app-error';

// * ---------------------------------------------------------------------- * //

class PasswordDoesNotMatchError extends AppError {
  constructor() {
    super('Passwords does not match.', 400);
  }
}

// * ---------------------------------------------------------------------- * //

export { PasswordDoesNotMatchError };
