import { CreateVideoDto } from '@lessons:dtos/CreateVideo.dto';
import Video from '@lessons:entities/Video';

// ---------------------------------------------------------------------------------------------- //

interface IVideosRepository {
  create(data: CreateVideoDto): Promise<Video>;
  findById(id: string): Promise<Video | undefined>;
}

// ---------------------------------------------------------------------------------------------- //

export default IVideosRepository;
