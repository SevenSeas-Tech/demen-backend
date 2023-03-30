import { CreateVideoDto } from '@lessons:dtos/videos/CreateVideo.dto';
import { Video } from '@lessons:entities/Video';
import { IVideosRepository } from '@lessons:irepos/IVideos.repository';

// ---------------------------------------------------------------------------------------------- //
export class FakeVideosRepository implements IVideosRepository {
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

  async findById(id: string): Promise<Video | undefined> {
    return this.videos.find(video => video.id === id);
  }
}
