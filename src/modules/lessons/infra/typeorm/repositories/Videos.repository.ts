import { getRepository, Repository } from 'typeorm';

import { CreateVideoDto } from '@lessons:dtos/CreateVideo.dto';
import Video from '@lessons:entities/Video';
import IVideosRepository from '@lessons:irepos/IVideos.repository';

// ---------------------------------------------------------------------------------------------- //

class VideosRepository implements IVideosRepository {
  private repository: Repository<Video>;

  constructor() {
    this.repository = getRepository(Video);
  }

  async create(data: CreateVideoDto): Promise<Video> {
    const {
      id,
      channelId,
      subjectId,
      userId,
      institution,
      publishedAt,
      teacher,
      title,
      thumbnail
    } = data;

    const video = this.repository.create({
      id,
      channelId,
      subjectId,
      userId,
      institution,
      publishedAt,
      teacher,
      title,
      thumbnail
    });

    await this.repository.save(video);

    return video;
  }
}

// ---------------------------------------------------------------------------------------------- //

export default VideosRepository;
