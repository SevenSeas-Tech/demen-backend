import AppError from '@shared/errors/App.error';

class SubjectNotFoundError extends AppError {
  constructor() {
    super('Subject not found!', 404);
  }
}

export default SubjectNotFoundError;
