import type { Course } from '@education:models/course';
import type { Discipline } from '@education:models/discipline';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface CourseDiscipline {
  courseId: Uuid;
  disciplineId: Uuid;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relation --------------------------------------------------- *** //
  course?: Course;
  discipline?: Discipline;
}
