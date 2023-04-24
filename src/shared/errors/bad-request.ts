import { AppError } from './app-error';

// * ---------------------------------------------------------------------- * //

class BadRequestError extends AppError {
  constructor() {
    super('Bad Request', 400);
  }
}

// * ---------------------------------------------------------------------- * //

export { BadRequestError };
