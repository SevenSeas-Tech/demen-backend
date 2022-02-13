import { container } from 'tsyringe';
import '@lessons:containers/providers';

import { IChannelsRepository } from '@lessons:irepos/IChannels.repository';
import { ISubjectsRepository } from '@lessons:irepos/ISubjects.repository';
import { IVideosRepository } from '@lessons:irepos/IVideos.repository';
import { ChannelsRepository } from '@lessons:repos/Channels.repository';
import { SubjectsRepository } from '@lessons:repos/Subjects.repository';
import { VideosRepository } from '@lessons:repos/Videos.repository';

// ---------------------------------------------------------------------------------------------- //

container.registerSingleton<IVideosRepository>('VideosRepository', VideosRepository);

container.registerSingleton<IChannelsRepository>('ChannelsRepository', ChannelsRepository);

container.registerSingleton<ISubjectsRepository>('SubjectsRepository', SubjectsRepository);
