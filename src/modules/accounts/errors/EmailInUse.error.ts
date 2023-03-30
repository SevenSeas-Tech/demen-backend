import { AppError } from '@shared/errors/App.error';

export class EmailInUseError extends AppError {
  constructor() {
    super('Email is already in use!', 400);
  }
}
