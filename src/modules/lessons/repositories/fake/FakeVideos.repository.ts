import { CreateVideoDto } from '@lessons:dtos/CreateVideo.dto';
import Video from '@lessons:entities/Video';
import IVideosRepository from '@lessons:irepos/IVideos.repository';

class FakeVideosRepository implements IVideosRepository {
  private videos: Video[] = [];

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

    const video = new Video();
    const date = new Date();

    Object.assign(video, {
      id,
      channelId,
      subjectId,
      userId,
      institution,
      publishedAt,
      teacher,
      title,
      thumbnail,
      createdAt: date,
      updatedAt: date
    });

    this.videos.push(video);

    return video;
  }
}

export default FakeVideosRepository;
