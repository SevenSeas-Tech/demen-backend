import { inject, injectable } from 'tsyringe';

import IApiProvider from '@admin:containers/providers/API/IApi.provider';
import VideoAlreadyExistsError from '@admin:errors/VideoAlreadyExists.error';
import Video from '@lessons:entities/Video';
import SubjectNotFoundError from '@lessons:errors/SubjectNotFound.error';
import IChannelRepository from '@lessons:irepos/IChannels.repository';
import ISubjectsRepository from '@lessons:irepos/ISubjects.repository';
import IVideosRepository from '@lessons:irepos/IVideos.repository';
import { Uuid } from '@shared/@types/Uuid';

// ---------------------------------------------------------------------------------------------- //

interface IRequestDto {
  id: string;
  subjectId: Uuid;
  userId: Uuid;
  institution?: string;
  teacher?: string;
}

@injectable()
class CreateVideoService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,

    @inject('ChannelsRepository')
    private channelsRepository: IChannelRepository,

    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,

    @inject('ApiProvider')
    private ApiProvider: IApiProvider
  ) {}

  async execute({ id, subjectId, userId, institution, teacher }: IRequestDto): Promise<Video> {
    // * ---- Video Validation ---------------------------------------------------------------- * //
    const existingVideo = await this.videosRepository.findById(id);

    if (existingVideo) {
      throw new VideoAlreadyExistsError();
    }

    // * ---- Subject Validation -------------------------------------------------------------- * //
    const subject = await this.subjectsRepository.findById(subjectId);

    if (!subject) {
      throw new SubjectNotFoundError();
    }

    // * ---- API Search ---------------------------------------------------------------------- * //
    const apiVideoResponse = await this.ApiProvider.getVideo(id);
    const { channelId, publishedAt, thumbnail, title } = apiVideoResponse;

    // * ---- Channel Validation -------------------------------------------------------------- * //
    const channel = await this.channelsRepository.findById(apiVideoResponse.channelId);

    if (!channel) {
      const apiChannelResponse = await this.ApiProvider.getChannel(apiVideoResponse.channelId);

      this.channelsRepository.create(apiChannelResponse);
    }

    // * ---- Video Creation ------------------------------------------------------------------ * //
    const video = await this.videosRepository.create({
      id,
      channelId,
      subjectId,
      userId,
      publishedAt,
      thumbnail,
      title,
      institution,
      teacher
    });

    return video;
  }
}

export { CreateVideoService };
