import { CreateChannelDto } from '@lessons:dtos/channels/CreateChannel.dto';
import { Channel } from '@lessons:entities/Channel';
import { IChannelsRepository } from '@lessons:irepos/IChannels.repository';

// ---------------------------------------------------------------------------------------------- //

export class FakeChannelsRepository implements IChannelsRepository {
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

  async findById(id: string): Promise<Channel | undefined> {
    return this.channels.find(channel => channel.id === id);
  }
}
