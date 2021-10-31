import { CreateVideoDto } from '@lessons:dtos/CreateVideo.dto';
import Video from '@lessons:entities/Video';

// ---------------------------------------------------------------------------------------------- //

interface IVideosRepository {
  create(data: CreateVideoDto): Promise<Video>;
}

// ---------------------------------------------------------------------------------------------- //

export default IVideosRepository;
