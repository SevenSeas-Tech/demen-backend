import { AppError } from '@shared/errors/App.error';

export class SubjectNotFoundError extends AppError {
  constructor() {
    super('Subject not found!', 404);
  }
}
