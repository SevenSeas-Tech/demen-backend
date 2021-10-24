import { ChannelResponseDTO } from '@admin:dtos/videos/ChannelResponse.dto';
import { VideoResponseDTO } from '@admin:dtos/videos/VideoResponse.dto';

// ---------------------------------------------------------------------------------------------- //
interface IApiProvider {
  getVideo(id: string): Promise<VideoResponseDTO>;
  getChannel(id: string): Promise<ChannelResponseDTO>;
}

// ---------------------------------------------------------------------------------------------- //

export default IApiProvider;
