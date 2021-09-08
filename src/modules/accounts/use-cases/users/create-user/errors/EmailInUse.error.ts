import AppError from '@shared/errors/AppError';

class EmailInUseError extends AppError {
  constructor() {
    super('Email is already in use!', 400);
  }
}

export default EmailInUseError;
