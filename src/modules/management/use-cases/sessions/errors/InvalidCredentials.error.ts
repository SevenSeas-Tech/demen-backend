import { AppError } from '@shared/errors/App.error';

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Incorrect password or email');
  }
}
