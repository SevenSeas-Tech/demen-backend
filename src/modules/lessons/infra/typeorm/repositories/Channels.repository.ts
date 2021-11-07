import { getRepository, Repository } from 'typeorm';

import { CreateChannelDto } from '@lessons:dtos/CreateChannel.dto';
import Channel from '@lessons:entities/Channel';
import IChannelRepository from '@lessons:irepos/IChannels.repository';

// ---------------------------------------------------------------------------------------------- //

class ChannelsRepository implements IChannelRepository {
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

// ---------------------------------------------------------------------------------------------- //

export default ChannelsRepository;
