import type { Course } from '@education:models/course';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Level {
  id: Uuid;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------  *** //
  courses?: Course[];
}
