import { AppError } from '@shared/errors/App.error';

export class VideoAlreadyExistsError extends AppError {
  constructor() {
    super('Video already exists!', 400);
  }
}
