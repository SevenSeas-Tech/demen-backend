import { AppError } from '@shared/errors/App.error';

export class UserNotFoundError extends AppError {
  constructor() {
    super('User not found!', 404);
  }
}
