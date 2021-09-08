import AppError from '@shared/errors/AppError';

class UsernameTaken extends AppError {
  constructor() {
    super('Username is already taken!', 400);
  }
}

export default UsernameTaken;
