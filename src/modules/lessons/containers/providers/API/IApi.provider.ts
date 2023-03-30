import { ChannelResponseDTO } from '@lessons:dtos/channels/ChannelResponse.dto';
import { VideoResponseDTO } from '@lessons:dtos/videos/VideoResponse.dto';

// ---------------------------------------------------------------------------------------------- //
export interface IApiProvider {
  getVideo(id: string): Promise<VideoResponseDTO>;
  getChannel(id: string): Promise<ChannelResponseDTO>;
}
