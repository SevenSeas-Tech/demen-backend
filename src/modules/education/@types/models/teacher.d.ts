import type { Video } from '@content:models/video';
import type { TeacherLink } from '@education:models/teacher-link';
import type { Uuid } from '@types';

// * ---------------------------------------------------------------------- * //

export interface Teacher {
  id: Uuid;
  name?: string;
  createdAt: Date;
  updatedAt: Date;

  // *** --- relations -------------------------------------------------- *** //
  videos?: Video[];
  links?: TeacherLink[];
}
