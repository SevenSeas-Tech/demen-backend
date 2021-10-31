import { getRepository, Repository } from 'typeorm';

import { CreateChannelDto } from '@lessons:dtos/CreateChannelDto';
import Channel from '@lessons:entities/Channel';
import IChannelRepositories from '@lessons:irepos/IChannels.repository';

// ---------------------------------------------------------------------------------------------- //

class ChannelsRepository implements IChannelRepositories {
  private repository: Repository<Channel>;

  constructor() {
    this.repository = getRepository(Channel);
  }

  async create(data: CreateChannelDto): Promise<Channel> {
    const { id, description, title, thumbnail } = data;

    const channel = this.repository.create({ id, description, title, thumbnail });

    return this.repository.save(channel);
  }
}

export default ChannelsRepository;
