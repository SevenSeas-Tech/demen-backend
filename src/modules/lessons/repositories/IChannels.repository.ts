import { CreateChannelDto } from '@lessons:dtos/CreateChannel.dto';
import Channel from '@lessons:entities/Channel';

interface IChannelRepositories {
  create(data: CreateChannelDto): Promise<Channel>;
  findById(id: string): Promise<Channel | undefined>;
}

export default IChannelRepositories;
