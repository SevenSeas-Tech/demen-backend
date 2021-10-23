import axios from 'axios';

import IAPIProvider from '@admin:containers/providers/API/IAPI.provider';
import { ApiVideoResponseDTO } from '@admin:dtos/g-api/ApiVideoResponse.dto';
import { VideoResponseDTO } from '@admin:dtos/videos/VideoResponse.dto';
import GApiConfig from '@config/g-api/GApi.config';

// ---------------------------------------------------------------------------------------------- //

class AxiosProvider implements IAPIProvider {
  async getVideo(id: string): Promise<VideoResponseDTO> {
    const { videos: videosUrl, apiKey, fields, parts } = GApiConfig;

    const response = await axios.get(videosUrl, {
      params: { id, key: apiKey, part: parts, fields }
    });

    const { items } = response.data as ApiVideoResponseDTO;

    const { channelId, description, title, thumbnails, publishedAt } = items.snippet;

    return {
      id,
      channel: channelId,
      description,
      title,
      thumbnail: thumbnails.default.url,
      publishedAt
    };
  }
}

// ---------------------------------------------------------------------------------------------- //

export default AxiosProvider;
