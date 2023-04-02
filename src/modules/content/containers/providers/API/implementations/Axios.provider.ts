import axios from 'axios';

import GApiConfig from '@config/g-api/GApi.config';
import { IApiProvider } from '@lessons:containers/providers/API/IApi.provider';
import { ChannelResponseDTO } from '@lessons:dtos/channels/ChannelResponse.dto';
import { ApiChannelResponseDTO } from '@lessons:dtos/g-api/ApiChannelResponse.dto';
import { ApiVideoResponseDTO } from '@lessons:dtos/g-api/ApiVideoResponse.dto';
import { VideoResponseDTO } from '@lessons:dtos/videos/VideoResponse.dto';

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

export { AxiosProvider };
