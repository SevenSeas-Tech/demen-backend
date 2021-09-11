import AppError from '@shared/errors/App.error';

class InvalidDataError extends AppError {
  constructor() {
    super('Invalid data', 400);
  }
}

export default InvalidDataError;
