import AppError from '@shared/errors/AppError';

class EmailInUse extends AppError {
  constructor() {
    super('Email is already in use!', 400);
  }
}

export default EmailInUse;
