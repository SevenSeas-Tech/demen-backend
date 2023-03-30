import { AppError } from '@shared/errors/App.error';

export class UsernameTakenError extends AppError {
  constructor() {
    super('Username is already taken!', 400);
  }
}
