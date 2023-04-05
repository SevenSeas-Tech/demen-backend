import type { Video } from '@content:models/video';

// * ---------------------------------------------------------------------- * //

export interface Channel {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;

  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  videos?: Video[];
}
