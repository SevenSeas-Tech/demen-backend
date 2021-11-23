import AppError from '@shared/errors/App.error';

class InvalidCredentialsError extends AppError {
  constructor() {
    super('Incorrect password or email');
  }
}

export { InvalidCredentialsError };
