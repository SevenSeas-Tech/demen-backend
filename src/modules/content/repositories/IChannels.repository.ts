import { CreateChannelDto } from '@lessons:dtos/channels/CreateChannel.dto';
import { Channel } from '@lessons:entities/Channel';

export interface IChannelsRepository {
  create(data: CreateChannelDto): Promise<Channel>;
  findById(id: string): Promise<Channel | undefined>;
}
