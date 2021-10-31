import AppError from '@shared/errors/App.error';

class VideoAlreadyExistsError extends AppError {
  constructor() {
    super('Video already exists!', 400);
  }
}

export default VideoAlreadyExistsError;
