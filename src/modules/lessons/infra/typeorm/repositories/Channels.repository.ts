import { getRepository, Repository } from 'typeorm';

import { CreateChannelDto } from '@lessons:dtos/channels/CreateChannel.dto';
import { Channel } from '@lessons:entities/Channel';
import { IChannelsRepository } from '@lessons:irepos/IChannels.repository';

// ---------------------------------------------------------------------------------------------- //

export class ChannelsRepository implements IChannelsRepository {
  private repository: Repository<Channel>;

  constructor() {
    this.repository = getRepository(Channel);
  }

  async create(data: CreateChannelDto): Promise<Channel> {
    const { id, description, title, thumbnail } = data;

    const channel = this.repository.create({ id, description, title, thumbnail });

    return this.repository.save(channel);
  }

  async findById(id: string): Promise<Channel | undefined> {
    return this.repository.findOne(id);
  }
}
