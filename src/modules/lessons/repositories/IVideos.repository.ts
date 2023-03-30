import { CreateVideoDto } from '@lessons:dtos/videos/CreateVideo.dto';
import { Video } from '@lessons:entities/Video';

// ---------------------------------------------------------------------------------------------- //

export interface IVideosRepository {
  create(data: CreateVideoDto): Promise<Video>;
  findById(id: string): Promise<Video | undefined>;
}

// ---------------------------------------------------------------------------------------------- //
