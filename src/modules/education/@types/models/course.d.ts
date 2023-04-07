import type { CourseDiscipline } from '@education:models/course-discipline';
import type { Level } from '@education:models/level';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Course {
  id: Uuid;
  levelId: Uuid;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;

  // *** --- relations -------------------------------------------------- *** //
  level?: Level;
  disciplines?: CourseDiscipline[];
}
