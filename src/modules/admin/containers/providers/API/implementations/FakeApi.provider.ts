import IApiProvider from '@admin:containers/providers/API/IApi.provider';
import { ApiChannelResponseDTO } from '@admin:dtos/g-api/ApiChannelResponse.dto';
import { ChannelResponseDTO } from '@admin:dtos/videos/ChannelResponse.dto';
import { VideoResponseDTO } from '@admin:dtos/videos/VideoResponse.dto';
import AppError from '@shared/errors/App.error';

// ---------------------------------------------------------------------------------------------- //

class FakeApiProvider implements IApiProvider {
  private channels: ApiChannelResponseDTO[] = [];

  private mockVideo: VideoResponseDTO = {
    id: 'right-id',
    channelId: 'right-id',
    description: 'mock video',
    publishedAt: '02032021',
    title: 'mock video',
    thumbnail: 'thumbnail'
  };

  private mockChannel: ChannelResponseDTO = {
    id: 'right-id',
    description: 'mock video',
    title: 'mock video',
    thumbnail: 'thumbnail'
  };

  async getVideo(id: string): Promise<VideoResponseDTO> {
    if (id !== this.mockVideo.id) {
      throw new AppError('Video not found', 404);
    }

    return this.mockVideo;
  }

  async getChannel(id: string): Promise<ChannelResponseDTO> {
    if (id !== this.mockVideo.id) {
      throw new AppError('Channel not found', 404);
    }

    return this.mockChannel;
  }
}

// ---------------------------------------------------------------------------------------------- //

export default FakeApiProvider;
