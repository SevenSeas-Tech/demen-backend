import type { Teacher } from '@education:models/teacher';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface TeacherLink {
  id: Uuid;
  teacherId: Uuid;

  name: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  teacher?: Teacher;
}
