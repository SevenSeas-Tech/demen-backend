import type { Discipline } from '@education:models/discipline';
import type { Video } from '@content:infra/typeorm/entities/Video';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Subject {
  id: Uuid;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  disciplines?: Discipline[];
  videos?: Video[];
}
