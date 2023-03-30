import { AppError } from '@shared/errors/App.error';

export class InvalidDataError extends AppError {
  constructor() {
    super('Invalid data!', 400);
  }
}
