import AppError from '@shared/errors/App.error';

class UsernameTakenError extends AppError {
  constructor() {
    super('Username is already taken!', 400);
  }
}

export default UsernameTakenError;
