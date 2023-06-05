import { AppError } from './app-error';

// * ---------------------------------------------------------------------- * //

class InvalidDataError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

// * ---------------------------------------------------------------------- * //

export { InvalidDataError };
