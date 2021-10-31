import { CreateChannelDto } from '@lessons:dtos/CreateChannelDto';
import Channel from '@lessons:entities/Channel';

interface IChannelRepositories {
  create(data: CreateChannelDto): Promise<Channel>;
}

export default IChannelRepositories;
