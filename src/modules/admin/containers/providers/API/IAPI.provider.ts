import { VideoResponseDTO } from '@admin:dtos/videos/VideoResponse.dto';

interface IAPIProvider {
  getVideo(id: string): Promise<VideoResponseDTO>;
}

export default IAPIProvider;
