import { AppError } from '../app-error';

// * ---------------------------------------------------------------------- * //

class BadRequestError extends AppError {
  constructor() {
    super('bad request', 400);
  }
}

// * ---------------------------------------------------------------------- * //

export { BadRequestError };
