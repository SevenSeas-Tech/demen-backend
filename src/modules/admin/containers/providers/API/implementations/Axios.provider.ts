import axios from 'axios';

import IApiProvider from '@admin:containers/providers/API/IApi.provider';
import { ApiChannelResponseDTO } from '@admin:dtos/g-api/ApiChannelResponse.dto';
import { ApiVideoResponseDTO } from '@admin:dtos/g-api/ApiVideoResponse.dto';
import { ChannelResponseDTO } from '@admin:dtos/videos/ChannelResponse.dto';
import { VideoResponseDTO } from '@admin:dtos/videos/VideoResponse.dto';
import GApiConfig from '@config/g-api/GApi.config';

// ---------------------------------------------------------------------------------------------- //

class AxiosProvider implements IApiProvider {
  private apiKey = GApiConfig.apiKey;

  // * ---------------------------------------------------------------------------------------- * //

  async getChannel(id: string): Promise<ChannelResponseDTO> {
    const { channelsUrl, channelFields: fields, parts } = GApiConfig;

    const response = await axios.get(channelsUrl, {
      params: { id, key: this.apiKey, part: parts, fields }
    });

    const { items } = response.data as ApiChannelResponseDTO;

    const { description, title, thumbnails } = items.snippet;

    return {
      id,
      description,
      title,
      thumbnail: thumbnails.default.url
    };
  }

  // * ---------------------------------------------------------------------------------------- * //

  async getVideo(id: string): Promise<VideoResponseDTO> {
    const { videosUrl, videoFields: fields, parts } = GApiConfig;

    const response = await axios.get(videosUrl, {
      params: { id, key: this.apiKey, part: parts, fields }
    });

    const { items } = response.data as ApiVideoResponseDTO;

    const { channelId, description, title, thumbnails, publishedAt } = items.snippet;

    return {
      id,
      channelId,
      description,
      title,
      thumbnail: thumbnails.default.url,
      publishedAt
    };
  }
}

// ---------------------------------------------------------------------------------------------- //

export default AxiosProvider;
