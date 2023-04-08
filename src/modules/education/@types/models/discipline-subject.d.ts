import type { Discipline } from './discipline';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface DisciplineSubject {
  disciplineId: Uuid;
  subjectId: Uuid;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  discipline?: Discipline;
  subject?: Subject;
}
