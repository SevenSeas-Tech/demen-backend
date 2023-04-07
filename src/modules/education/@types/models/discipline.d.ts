import type { CourseDiscipline } from '@education:models/course-discipline';
import type { DisciplineSubject } from '@education:models/discipline-subject';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Discipline {
  id: Uuid;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;

  // *** --- relations -------------------------------------------------- *** //
  courses?: CourseDiscipline[];
  subjects?: DisciplineSubject[];
}

