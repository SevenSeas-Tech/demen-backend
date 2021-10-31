import { CreateChannelDto } from '@lessons:dtos/CreateChannel.dto';
import Channel from '@lessons:entities/Channel';

interface IChannelRepositories {
  create(data: CreateChannelDto): Promise<Channel>;
}

export default IChannelRepositories;
