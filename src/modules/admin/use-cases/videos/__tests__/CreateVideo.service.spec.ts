import IApiProvider from '@admin:containers/providers/API/IApi.provider';
import FakeApiProvider from '@admin:containers/providers/API/implementations/FakeApi.provider';
import VideoAlreadyExistsError from '@admin:errors/VideoAlreadyExists.error';
import Subject from '@lessons:entities/Subject';
import SubjectNotFoundError from '@lessons:errors/SubjectNotFound.error';
import FakeChannelsRepository from '@lessons:irepos/fake/FakeChannels.repository';
import FakeSubjectsRepository from '@lessons:irepos/fake/FakeSubjects.repository';
import FakeVideosRepository from '@lessons:irepos/fake/FakeVideos.repository';
import IChannelRepository from '@lessons:irepos/IChannels.repository';
import ISubjectsRepository from '@lessons:irepos/ISubjects.repository';
import IVideosRepository from '@lessons:irepos/IVideos.repository';
// eslint-disable-next-line import-helpers/order-imports
import { CreateVideoService } from '@admin:use-cases/videos/CreateVideo.service';

// ---------------------------------------------------------------------------------------------- //

describe('Create Video Service', () => {
  const id = 'right-id';
  const userId = 'user-id';
  const institution = 'fake institution';
  const teacher = 'fake teacher';

  let subject: Subject;

  let createVideoService: CreateVideoService;

  let videosRepository: IVideosRepository;
  let channelsRepository: IChannelRepository;
  let subjectsRepository: ISubjectsRepository;

  let apiProvider: IApiProvider;

  // -------------------------------------------------------------------------------------------- //

  beforeEach(async () => {
    videosRepository = new FakeVideosRepository();
    channelsRepository = new FakeChannelsRepository();
    subjectsRepository = new FakeSubjectsRepository();

    apiProvider = new FakeApiProvider();

    subject = await subjectsRepository.create({
      description: 'fake subject',
      title: 'fake subject'
    });

    createVideoService = new CreateVideoService(
      videosRepository,
      channelsRepository,
      subjectsRepository,
      apiProvider
    );
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create a video', async () => {
    const getVideo = jest.spyOn(apiProvider, 'getVideo');
    const getChannel = jest.spyOn(apiProvider, 'getChannel');

    const video = await createVideoService.execute({
      id,
      subjectId: subject.id,
      userId,
      institution,
      teacher
    });

    expect(getVideo).toBeCalled();
    expect(getChannel).toBeCalled();

    expect(video).toHaveProperty('id');

    expect(video).toHaveProperty('channelId');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create repeated video', async () => {
    await createVideoService.execute({
      id,
      subjectId: subject.id,
      userId,
      institution,
      teacher
    });

    expect(async () => {
      await createVideoService.execute({
        id,
        subjectId: subject.id,
        userId,
        institution,
        teacher
      });
    }).rejects.toEqual(new VideoAlreadyExistsError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create video if subject does not exist', async () => {
    expect(async () => {
      await createVideoService.execute({
        id,
        subjectId: 'wrong-id',
        userId,
        institution,
        teacher
      });
    }).rejects.toEqual(new SubjectNotFoundError());
  });
});
