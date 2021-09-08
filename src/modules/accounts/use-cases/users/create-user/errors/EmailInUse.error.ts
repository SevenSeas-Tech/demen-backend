import AppError from '@shared/errors/App.error';

class EmailInUseError extends AppError {
  constructor() {
    super('Email is already in use!', 400);
  }
}

export default EmailInUseError;
