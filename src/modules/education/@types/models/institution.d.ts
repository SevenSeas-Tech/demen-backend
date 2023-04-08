import type { Video } from '@content:infra/typeorm/entities/Video';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Institution {
  id: Uuid;
  name: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  videos?: Video[];
}
