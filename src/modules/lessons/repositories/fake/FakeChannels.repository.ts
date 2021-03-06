import { CreateChannelDto } from '@lessons:dtos/CreateChannelDto';
import Channel from '@lessons:entities/Channel';
import IChannelRepositories from '@lessons:irepos/IChannels.repository';

// ---------------------------------------------------------------------------------------------- //

class FakeChannelsRepository implements IChannelRepositories {
  private channels: Channel[] = [];

  async create(data: CreateChannelDto): Promise<Channel> {
    const { id, title, description, thumbnail } = data;

    const channel = new Channel();
    const date = new Date();
    Object.assign(channel, {
      id,
      description,
      title,
      thumbnail,
      videos: [],
      createdAt: date,
      updatedAt: date
    });

    this.channels.push(channel);

    return channel;
  }
}

// ---------------------------------------------------------------------------------------------- //

export default FakeChannelsRepository;
